const presentation = document.querySelector("[role=presentation]");
const logo = document.getElementById("logo");
const hex_code = document.getElementById("color");
const punchline = document.getElementById("punchline");
const button_text = document.getElementById("button-text");
const reset = document.querySelector("[data-command=reset]");

const div_class = ['truncate', 'min-w-0'];
const p_class = ['text-r8-sm', 'text-r8-gray-11', 'truncate'];
const preview_class = ['flex', 'items-center', 'mt-1', 'overflow-hidden'];
const preview_div = ['flex-shrink-0', 'ml-2'];

var file = null;

function on_click() {
    logo.click();
    presentation.addEventListener('change', display_file, false);

    function display_file ( event ) {
        event.stopImmediatePropagation();
        var presentation = event.srcElement;

        /*------------logo src---------------*/
        var file_name = presentation.files[0].name;
        file = presentation.files[0];
        var has_error = document.querySelector("[data-name=file-error]");
        var preview = document.querySelector("[data-testid=simple-preview]");

        if (!(file_name.match(/\.(png)$/i))) {

            logo.textContent = "";

            if (document.querySelector("[error-name=logo-error]")) {
                document.querySelector("[error-name=logo-error]").remove();
            }

            if (has_error == null) {
                document.querySelector("[data-testid=logo]").after(raise_error("Only .png files are allowed."));
            }
            
            return;
        } else {

            if (preview != null) {
                preview.remove();
            }

            if (has_error != null) {
                has_error.remove();
            }

        }

        logo.textContent = file_name;
        const p = document.createElement('p'); 
        p.setAttribute('data-testid', 'p-info');
        p_class.map(p_ => {p.classList.add(p_)});
        p.textContent = logo.textContent;

        const div = document.createElement('div');
        div_class.map(cls => {div.classList.add(cls)});
        div.append(p);

        const simple_preview = document.createElement('div');
        simple_preview.setAttribute('data-testid', 'simple-preview');
        preview_class.map(preview => {simple_preview.classList.add(preview)});
        simple_preview.append(div);
        /*------------------------------------*/

        /*------------trash svg---------------*/
        const trashSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const trashPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');

        trashSvg.setAttribute('width', '16');
        trashSvg.setAttribute('height', '16');
        trashSvg.setAttribute('fill', 'currentColor');
        trashSvg.setAttribute('viewBox', '0 0 256 256');
        
        trashPath.setAttribute(
            'd',
            'M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z'
        );

        trashSvg.appendChild(trashPath);
        
        /*------------trash button------------*/

        const button_div = document.createElement('div');
        button_div.setAttribute('data-testid', 'trash');
        const b_div_c = ['flex-shrink-0', 'ml-2'];
        b_div_c.map(b_div => {button_div.classList.add(b_div)});

        const button = document.createElement('button');
        button.setAttribute('data-testid', 'trash-button');
        const b_c = ['flex', 'items-center', 'justify-center'];
        b_c.map(b_ => {button.classList.add(b_)});
        button.setAttribute('type', 'button');
        
        button.appendChild(trashSvg);
        button_div.appendChild(button);
        simple_preview.append(button_div);
        /*------------------------------------*/

        var preview = document.querySelector("[data-testid='simple-preview']");
        var presentation = document.querySelector("[role=presentation]");
        if (preview == null) {
            presentation.append(simple_preview);
        } else {
            preview.remove();
            presentation.append(preview);
        }

        if (document.querySelector("[error-name=logo-error]")) {
            document.querySelector("[error-name=logo-error]").remove();
        }

        const tb = document.querySelector("[data-testid=trash]");
        // trash button click
        tb.addEventListener(
            'click',
            ( evt ) => {
                evt.stopPropagation();
                simple_preview.remove();
                logo.textContent = p.textContent = "";
                event.target.value = "";
                img.remove();
            }
        );

        // reset button click
        const flyer = document.querySelector('[data-testid=flyer]');
        reset.addEventListener(
            'click',
            () => {
                logo.textContent = p.textContent = "";
                event.target.value = "";
                if (simple_preview) {
                    simple_preview.remove();
                }
            },
            false
        );

    }

    function raise_error(message){
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
        error.setAttribute('data-name', 'file-error');
        p_error.textContent = message;
        error.append(errorSvg);
        error.append(p_error);
    
        return error;
    } 

};

presentation.addEventListener('click', on_click, false);

hex_code.addEventListener(
    'change',
    (hex_event) => {
        hex_code.textContent = hex_event.target.value;
        reset.addEventListener(
            'click',
            () => {
                hex_code.textContent = hex_event.target.value = "-- Enter a hex code --";  
            },
            false
        );
    },
    false
);

punchline.addEventListener(
    'change',
    (punchline_event) => {
        punchline.textContent = punchline_event.target.value;
        reset.addEventListener(
            'click',
            () => {
                punchline.textContent = punchline_event.target.value = "-- Enter a punchline --";
            },
            false
        );
    },
    false
);

button_text.addEventListener(
    'change',
    (button_text_event) => {
        button_text.textContent = button_text_event.target.value;
        reset.addEventListener(
            'click',
            () => {
                button_text.textContent = button_text_event.target.value = "-- Enter a button text --";
            },
            false
        );
    },
    false
);

reset.addEventListener(
    'click',
    () => {
        const flyer = document.querySelector('[data-testid=flyer]');
        if (flyer) {
            flyer.remove();
        }
    },
    false
);