const formData = { email: "",  message: ""};
  const form = document.querySelector('.feedback-form');
  const key = "feedback-form-state";
  const savedData = localStorage.getItem(key);
  if (savedData) {
    const parsedData = JSON.parse(savedData);
    formData.email = parsedData.email || "";
    formData.message = parsedData.message || "";
    form.elements.email.value = formData.email;
    form.elements.message.value = formData.message;
  }

  form.addEventListener("input", event => {
    if (event.target.classList.contains("label-input")) {
        let userEmail = event.target.value.trim();
        formData.email = userEmail;
        localStorage.setItem(key, JSON.stringify(formData))
        userEmail = formData.email;
    } else if (event.target.classList.contains("textarea")) {
        const userMessage = event.target.value.trim();
        formData.message = userMessage;
        localStorage.setItem(key, JSON.stringify(formData))
    }
})
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!formData.email.trim() || !formData.message.trim()) {
      alert("Fill please all fields");
      return;
    }
    console.log(formData);
    localStorage.removeItem(key);
    formData.email = "";
    formData.message = "";
    form.reset();
  });