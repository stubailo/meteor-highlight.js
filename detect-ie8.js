isIE8 = false;

if (Meteor.isClient && navigator.userAgent.toLowerCase().indexOf('msie') !== -1) {
  if (!document.createElement('SVG').getAttributeNS) {
    isIE8 = true;
  }
}