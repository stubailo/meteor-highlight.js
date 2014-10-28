isIE8 = false;

if (navigator.userAgent.toLowerCase().indexOf('msie') !== -1) {
  if (!document.createElement('SVG').getAttributeNS) {
    if (document.createElement('DATA').getAttributeNS) {
      isIE8 = true;
    }
  }
}