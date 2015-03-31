//makes all images visible by default
$('img[data-real-src]').each(function(i, img) {
  var srcValue = $(img).attr('data-real-src');
  $(img).attr('src', srcValue).removeClass('hidden');
  
});