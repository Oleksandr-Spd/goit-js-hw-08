import throttle from 'lodash.throttle';

const LS_KEY = 'feedback-form-state';
let formData = {};
const form = document.querySelector('.feedback-form');

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, 500));

savedInput();

function onFormSubmit(evt) {
  evt.preventDefault();
  evt.currentTarget.reset();
  localStorage.removeItem('LS_KEY');
  console.log(formData);
}

function onFormInput(evt) {
  const { name, value } = evt.target;
  formData[name] = value;
  localStorage.setItem(LS_KEY, JSON.stringify(formData));
}

function savedInput() {
  try {
    const save = localStorage.getItem(LS_KEY);
    if (!save) return;
    formData = JSON.parse(save);
    Object.entries(formData).forEach(([key, val]) => {
      form.elements[key].value = val;
    });
  } catch (error) {}
}
