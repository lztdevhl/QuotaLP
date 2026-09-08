param(
  [ValidateSet('Windows','Capture','Hover','Click','Foreground','Maximize','Close','Scroll','RecordHover')][string]$Action = 'Windows',
  [int]$X = 0, [int]$Y = 0, [int]$Width = 0, [int]$Height = 0,
  [long]$Window = 0, [string]$Output = '.local-reference/desktop.png', [int]$Delay = 500,
  [int]$ScrollDelta = -600, [int]$TargetX = 0, [int]$TargetY = 0
)
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
Add-Type -AssemblyName System.Windows.Forms
Add-Type @'
using System;
using System.Runtime.InteropServices;
using System.Text;
public class QuotaInspection {
 [StructLayout(LayoutKind.Sequential)] public struct RECT {public int Left,Top,Right,Bottom;}
 public delegate bool EnumProc(IntPtr hwnd, IntPtr param);
 [DllImport("user32.dll")] public static extern bool EnumWindows(EnumProc proc,IntPtr param);
 [DllImport("user32.dll")] public static extern bool IsWindowVisible(IntPtr hwnd);
 [DllImport("user32.dll")] public static extern int GetWindowText(IntPtr hwnd,StringBuilder text,int max);
 [DllImport("user32.dll")] public static extern uint GetWindowThreadProcessId(IntPtr hwnd,out uint process);
 [DllImport("user32.dll")] public static extern bool GetWindowRect(IntPtr hwnd,out RECT rect);
 [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr hwnd);
 [DllImport("user32.dll")] public static extern bool ShowWindow(IntPtr hwnd,int cmd);
 [DllImport("user32.dll")] public static extern bool SetCursorPos(int x,int y);
 [DllImport("user32.dll")] public static extern void mouse_event(uint flags,uint dx,uint dy,uint data,UIntPtr extra);
 [DllImport("user32.dll")] public static extern bool PostMessage(IntPtr hwnd,uint msg,IntPtr w,IntPtr l);
 [DllImport("user32.dll")] public static extern bool SetProcessDPIAware();
 [DllImport("user32.dll")] public static extern uint GetDpiForWindow(IntPtr hwnd);
 public static void Wheel(int delta) { mouse_event(0x0800,0,0,unchecked((uint)delta),UIntPtr.Zero); }
}
'@
[void][QuotaInspection]::SetProcessDPIAware()
if ($Action -eq 'Windows') {
  $script:windows = @()
  [void][QuotaInspection]::EnumWindows({param($handle,$param)
    if ([QuotaInspection]::IsWindowVisible($handle)) {
      $procId = [uint32]0
      [void][QuotaInspection]::GetWindowThreadProcessId($handle,[ref]$procId)
      $proc = Get-Process -Id $procId -ErrorAction SilentlyContinue
      if ($proc.ProcessName -match 'quota|code|terminal|msedge|chrome') {
        $title = New-Object Text.StringBuilder 512
        [void][QuotaInspection]::GetWindowText($handle,$title,512)
        $rect = New-Object QuotaInspection+RECT
        [void][QuotaInspection]::GetWindowRect($handle,[ref]$rect)
        $script:windows += [pscustomobject]@{ Handle=$handle.ToInt64(); Process=$proc.ProcessName; Pid=$procId; Title=$title.ToString(); X=$rect.Left; Y=$rect.Top; Width=$rect.Right-$rect.Left; Height=$rect.Bottom-$rect.Top; Dpi=[QuotaInspection]::GetDpiForWindow($handle) }
      }
    }
    return $true
  },[IntPtr]::Zero)
  $script:windows | ConvertTo-Json
  [Windows.Forms.Screen]::AllScreens | Select-Object Bounds,WorkingArea,Primary | ConvertTo-Json -Depth 3
  exit
}
if ($Action -in @('Hover','Click')) {
  [void][QuotaInspection]::SetCursorPos($X,$Y)
  if ($Action -eq 'Click') {
    [QuotaInspection]::mouse_event(2,0,0,0,[UIntPtr]::Zero)
    [QuotaInspection]::mouse_event(4,0,0,0,[UIntPtr]::Zero)
  }
}
if ($Action -eq 'Foreground') { [void][QuotaInspection]::ShowWindow([IntPtr]$Window,9); [void][QuotaInspection]::SetForegroundWindow([IntPtr]$Window) }
if ($Action -eq 'Maximize') { [void][QuotaInspection]::ShowWindow([IntPtr]$Window,3); [void][QuotaInspection]::SetForegroundWindow([IntPtr]$Window) }
if ($Action -eq 'Close') { [void][QuotaInspection]::PostMessage([IntPtr]$Window,0x0010,[IntPtr]::Zero,[IntPtr]::Zero) }
if ($Action -eq 'Scroll') { [void][QuotaInspection]::SetCursorPos($X,$Y); [QuotaInspection]::Wheel($ScrollDelta) }
if ($Action -eq 'RecordHover') {
  $directory = [IO.Path]::GetFullPath((Join-Path (Get-Location) $Output))
  [void][IO.Directory]::CreateDirectory($directory)
  $frames = @()
  $bitmap = New-Object Drawing.Bitmap $Width,$Height
  $graphics = [Drawing.Graphics]::FromImage($bitmap)
  [void][QuotaInspection]::SetCursorPos($TargetX,$TargetY)
  $timer = [Diagnostics.Stopwatch]::StartNew()
  try {
    for ($frame=0; $frame -lt 45; $frame++) {
      $due = $frame * (1000 / 60)
      while ($timer.Elapsed.TotalMilliseconds -lt $due) { [Threading.Thread]::Sleep(1) }
      $frames += [math]::Round($timer.Elapsed.TotalMilliseconds,1)
      $graphics.CopyFromScreen($X,$Y,0,0,$bitmap.Size)
      $bitmap.Save((Join-Path $directory ('frame-{0:D3}.png' -f $frame)),[Drawing.Imaging.ImageFormat]::Png)
    }
  } finally { $graphics.Dispose(); $bitmap.Dispose() }
  Write-Output ($frames | ConvertTo-Json -Compress)
  exit
}
Start-Sleep -Milliseconds $Delay
if ($Action -eq 'Capture') {
  if ($Window) {
    $rect = New-Object QuotaInspection+RECT
    [void][QuotaInspection]::GetWindowRect([IntPtr]$Window,[ref]$rect)
    $X=$rect.Left; $Y=$rect.Top; $Width=$rect.Right-$rect.Left; $Height=$rect.Bottom-$rect.Top
  }
  if (!$Width -or !$Height) {
    $bounds = [Windows.Forms.SystemInformation]::VirtualScreen
    $X=$bounds.X; $Y=$bounds.Y; $Width=$bounds.Width; $Height=$bounds.Height
  }
  $file = [IO.Path]::GetFullPath((Join-Path (Get-Location) $Output))
  [void][IO.Directory]::CreateDirectory([IO.Path]::GetDirectoryName($file))
  $bitmap = New-Object Drawing.Bitmap $Width,$Height
  $graphics = [Drawing.Graphics]::FromImage($bitmap)
  try { $graphics.CopyFromScreen($X,$Y,0,0,$bitmap.Size); $bitmap.Save($file,[Drawing.Imaging.ImageFormat]::Png) }
  finally { $graphics.Dispose(); $bitmap.Dispose() }
  Write-Output "Captured ${Width}x${Height}: $Output"
}
