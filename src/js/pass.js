function toggleEye(id, eye_id) {
    var x = document.getElementById(id);
    var eye = document.getElementById(eye_id);
    if (x.type === "password") {
        x.type = "text";
        eye.className = "icon-eye-open"
    } else {
        x.type = "password";
        eye.className = "icon-eye-close"
    }
}
