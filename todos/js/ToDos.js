const input = document.querySelector('input');
const list = document.querySelector('ul');
const button = document.querySelector('button');

button.addEventListener('click', function() {
    const mytask = input.value;
    if (mytask !== "" ){
        input.value = '';
        const myli = document.createElement('li');
        const mycheckbutton = document.createElement('button');
        const myuncheck = document.createElement('span');
        const mycheck = document.createElement('span');
        const mybutton = document.createElement('button');
        mycheck.textContent = "☒";
        myuncheck.textContent = "☐";
        mycheckbutton.appendChild(myuncheck);
        mycheckbutton.appendChild(mycheck);
        myli.textContent = mytask;
        mybutton.textContent = '❌';
        myli.appendChild(mycheckbutton);
        myli.appendChild(mybutton);
        list.appendChild(myli);
        mybutton.addEventListener('click', ()=>{
            return myli.remove();
        })
        mycheckbutton.addEventListener('click', function(){
            mycheckbutton.classList.toggle("checked");
            myli.classList.toggle("checked");
        })
    }
input.focus()
})