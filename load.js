const img_src = sessionStorage.getItem('image_source');
if (img_src) {
  const img = document.createElement('img');
  img.setAttribute('data-testid', 'value-image-image');
  img.setAttribute('src', img_source);
  img.setAttribute('alt', 'image');
  img.setAttribute('class', 'max-w-full');
  
  const a =document.createElement('a');
  a.setAttribute('data-testid', 'value-image-url-image');
  a.setAttribute('href', img_source);
  a.setAttribute('rel', 'noreferrer');
  a.setAttribute('target', '_blank');
  a.setAttribute('class', 'inline-flex flex-col');
  a.append(img);
  
  const div = document.createElement('div');
  div.setAttribute('data-testid', 'value-image-input');
  div.append(a);
  document.querySelector("[data-testid=image-file-input]").append(div);
}
