function redir(path, method='POST') {
    console.log("called");
    user=document.getElementById("usernamedropdown").innerHTML
    const form = document.createElement('form');
    form.method = method;
    form.action = path;
    const hiddenField = document.createElement('input');
    hiddenField.type = 'hidden';
    hiddenField.name = 'username';
    hiddenField.value = user;
    form.appendChild(hiddenField);
    document.body.appendChild(form);
    form.submit();
  }
  