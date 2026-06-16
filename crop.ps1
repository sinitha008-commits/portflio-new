Add-Type -AssemblyName System.Drawing
$imagePath = "d:\portfolio sinitha\profile.jpg"
$outPath = "d:\portfolio sinitha\profile_cropped.jpg"

$img = [System.Drawing.Image]::FromFile($imagePath)

$cropSize = 600
$x = [math]::Floor(($img.Width - $cropSize) / 2)
$y = 100

$rect = New-Object System.Drawing.Rectangle($x, $y, $cropSize, $cropSize)
$bmp = New-Object System.Drawing.Bitmap($cropSize, $cropSize)

$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.DrawImage($img, (New-Object System.Drawing.Rectangle(0, 0, $cropSize, $cropSize)), $rect, [System.Drawing.GraphicsUnit]::Pixel)
$g.Dispose()

$bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$bmp.Dispose()
$img.Dispose()

Write-Host "Cropped image saved to $outPath"
