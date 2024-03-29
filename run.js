const run = document.querySelector("[data-testid=input-form]");
const img_url = new URL("https://s3-prod-europe.autonews.com/s3fs-public/styles/800x600/public/Tesla-Model%20S%20PLAID%20web.jpg");

function on_run ( event ){
    event.preventDefault();
    
    var err = false;

    const logo_input = document.querySelector("[data-testid=simple-preview]");
    const logo_error = document.querySelector("[error-name=logo-error]");
    const file_error = document.querySelector("[data-name=file-error]");
    if (logo_input == null) {
        err = true;
        if (file_error) {
            file_error.remove();
        }
        if (logo_error == null) {
            document.querySelector("[data-testid=logo]").after(raise_error("Logo field is required.", "logo-error"));
        }
    } else {
        err = false;
        if (logo_error) {
            logo_error.remove();
        }
    }

    const hex_error = document.querySelector("[error-name=hex-error]");
    if (hex_code.value == "-- Enter a hex code --") {
        err = true;
        if (hex_error == null) {
            document.querySelector("[data-testid=hex-code]").after(raise_error("Hex code field is required.", "hex-error"));
        }
    } else {
        err = false;
        if (hex_error) {
            hex_error.remove();
        }
    }

    const punchline_error = document.querySelector("[error-name=punchline-error]");
    if (punchline.value == "-- Enter a punchline --") {
        err = true;
        if (punchline_error == null){
            document.querySelector("[data-testid=punchline]").after(raise_error("Punchline field is required.", "punchline-error"));
        }
    } else {
        err = false;
        if (punchline_error) {
            punchline_error.remove();
        }
    }

    const button_error = document.querySelector("[error-name=button-error]");
    if (button_text.value == "-- Enter a button text --"){
        err = true;
        if (button_error == null){
            document.querySelector("[data-testid=button-text]").after(raise_error("Button text field is required.", "button-error"));
        }
    } else {
        err = false;
        if (button_error) {
            button_error.remove();
        }
    }

    if (file == null) {
        err = true;
    }

    if (hex_map.get(hex_code.value) == undefined) {
        err = true;
        document.querySelector("[data-testid=hex-code]").after(raise_error("Invalid hex code.", "hex-error"));
    }
    
    const flyer = document.querySelector('[data-testid=flyer]');
    if (!err){
        if (flyer) {
            flyer.remove();
        }
        //const image_url = sessionStorage.getItem('image_source');
        generate_flyer(URL.createObjectURL(file), hex_code.value, punchline.value, button_text.value);
    }

}

async function generate_flyer (logo_url, hex_code, punchline, button_text, image_url = img_url) {
    const flyer_banner = document.querySelector("[data-testid=flyer-banner]");
    const flyer = document.createElement('div');
    const head = document.getElementsByTagName("head")[0];
    const style = document.createElement("style");
    const flyer_style = `.flyer {height: 800px; width: 800px; background: white; margin-left: auto; margin-right: auto; border: solid ${hex_code};}`;
    style.append(flyer_style);
    flyer.classList.add('flyer');
    flyer.setAttribute('data-testid', 'flyer');

    /*--------------------- logo --------------------*/
    const logo_outside = document.createElement('div');
    logo_outside.classList.add('logo-outside');
    
    const logo_inside = document.createElement('a');
    logo_inside.classList.add('logo-inside');
    logo_inside.setAttribute('href', logo_url);
    logo_inside.setAttribute('rel', 'noreferrer');
    logo_inside.setAttribute('target', '_blank');

    const img = document.createElement('img');
    img.setAttribute('src', logo_url);
    img.classList.add('logo-inside');
    
    logo_inside.appendChild(img);
    logo_outside.appendChild(logo_inside);
    flyer.appendChild(logo_outside);
    /*-----------------------------------------------*/

    /*-------------- generated image --------------*/
    const gen_image = document.createElement('div');
    gen_image.classList.add('gen-image-outside');

    const gen_image_inside = document.createElement('a');
    gen_image_inside.classList.add('gen-image');
    gen_image_inside.setAttribute('href', image_url);
    gen_image_inside.setAttribute('rel', 'noreferrer');
    gen_image_inside.setAttribute('target', '_blank'); 
    
    const gen_image_img = document.createElement('img');
    gen_image_img.setAttribute('src', image_url);
    gen_image_img.classList.add('gen-image');

    gen_image_inside.appendChild(gen_image_img);
    gen_image.appendChild(gen_image_inside);
    flyer.appendChild(gen_image);
    /*---------------------------------------------*/

    /*------------- punchline -------------*/
    const pl = document.createElement('div');
    const pl_style = `.punchline {text-align: center; font-size: 50px; font-family: Calibri; color: ${hex_code}; padding-top: 0.5em; padding-bottom: 0.5em}`;
    pl.classList.add('punchline');
    style.append(pl_style);
    pl.textContent = pl.value = punchline;
    flyer.appendChild(pl);
    /*-------------------------------------*/

    /*----------------- button ----------------*/
    const button = document.createElement('div');
    const btn_style = `.button {margin: auto; width: 300px; height: 40px; border-radius: 25px; background-color: ${hex_code}; padding: 10px;}`;
    button.classList.add('button');
    button.classList.add('button-text');
    style.append(btn_style);
    button.textContent = button.value = button_text;
    flyer.appendChild(button);
    /*-----------------------------------------*/

    head.appendChild(style);
    flyer_banner.appendChild(flyer);
    const owner = flyer.ownerDocument;
    const dom = owner.documentElement;

    console.log(owner);
    console.log(dom);
    
    const btn_text = `.button-text {text-align: center; font-family: calibri; color: white;}`;
    const logo_outside_style = `.logo-outside {padding-top: 0.75rem; padding-bottom: 0.75em;}`;
    const logo_inside_style = `.logo-inside {width:100px; height:100px; margin-left: auto; margin-right: auto; display: block;}`;
    const gen_image_outside_style = `.gen-image-outside {width: 400px; height: 400px; padding: 10px; margin: auto; display: block;}`;
    const gen_image_inside_style = `.gen-image {width: 100%; height: 100%; border-radius: 25%;}`;
    const fs = `${flyer_style} ${pl_style} ${btn_style} ${btn_text} ${logo_outside_style} ${logo_inside_style} ${gen_image_outside_style} ${gen_image_inside_style}`;
    const flyer_html = `<html id='flyer_html'><head><style>${fs}</style></head><body>${flyer_banner.innerHTML}</body></html>`;

    const json = {
        html: flyer_banner.innerHTML,
        css: fs
    };

    const username = "b784e1c8-1ee0-489f-bc03-80e916f9b3af";
    const password = "fd31b3ef-4ec7-47df-954f-62171e72c98e";

    const options = {
      method: 'POST',
      body: JSON.stringify(json),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(username + ":" + password)
      }
    }

    fetch('https://hcti.io/v1/image', options)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(res.status);
        }
      })
      .then(data => {
        // Image URL is available here
        console.log(data.url)
      })
      .catch(err => console.error(err));
    /* API request
    const inputs = {
        'flyer_html' : flyer_html
    };
    const apiUrl = 'http://localhost:8080/';
    const options = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(inputs)
    };
    fetch(apiUrl, options)
        .then(response => {
            if(!response.ok){
                throw new Error('Network response was not ok.');
            };
        })
        .then(data => {
          console.log('Data sent successfully:', data);
        })
        .catch(error => {
          console.error('There was a problem sending the data:', error);
        });*/

}

function raise_error(message, name) {
    /*---------------error svg-----------------*/
    const errorSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    errorSvg.setAttribute('width', '16');
    errorSvg.setAttribute('height', '16');
    errorSvg.setAttribute('fill', 'currentColor');
    errorSvg.setAttribute('viewBox', '0 0 256 256');
    
    const errorPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    errorPath.setAttribute(
        'd',
        'M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm16-40a8,8,0,0,1-8,8,16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40A8,8,0,0,1,144,176ZM112,84a12,12,0,1,1,12,12A12,12,0,0,1,112,84Z'
    );
    
    errorSvg.appendChild(errorPath);
    /*---------------error message-------------*/
    const error = document.createElement('div');
    const p_error = document.createElement('p');
    p_error.setAttribute('class', 'text-r8-sm');
    const err_class = ['mt-2', 'flex', 'items-center', 'text-r8-red-10', 'gap-1'];
    err_class.map(err => {error.classList.add(err)});
    error.setAttribute('error-name', name);
    p_error.textContent = message;
    error.append(errorSvg);
    error.append(p_error);

    return error;
}

run.addEventListener('submit', on_run, false);
