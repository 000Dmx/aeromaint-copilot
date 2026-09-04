const form = document.querySelector("#verification-form");
const alertBox = document.querySelector("#form-alert");
const fields = [
  { id: "employee-id", message: "请输入维修人员工号" },
  { id: "device-id", message: "请输入无人机设备编号" },
];

function setFieldState(field, isValid) {
  const input = document.querySelector(`#${field.id}`);
  const wrapper = input.closest(".field");
  const error = document.querySelector(`[data-error-for="${field.id}"]`);
  wrapper.classList.toggle("invalid", !isValid);
  input.setAttribute("aria-invalid", String(!isValid));
  error.textContent = isValid ? "" : field.message;
  return isValid;
}

fields.forEach((field) => {
  const input = document.querySelector(`#${field.id}`);
  input.addEventListener("input", () => {
    if (input.value.trim()) setFieldState(field, true);
    alertBox.className = "alert";
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const validity = fields.map((field) => {
    const input = document.querySelector(`#${field.id}`);
    return setFieldState(field, input.value.trim().length > 0);
  });

  if (validity.includes(false)) {
    alertBox.textContent = "信息尚未填写完整，请检查标记的输入项。";
    alertBox.className = "alert error show";
    document.querySelector(".field.invalid input")?.focus();
    return;
  }

  const status = new FormData(form).get("deviceStatus");
  const statusText = status === "active" ? "正在使用" : "已停止使用";
  const submitButton = form.querySelector(".submit-btn");
  alertBox.textContent = `身份信息验证完成，设备状态已登记为“${statusText}”。页面即将关闭…`;
  alertBox.className = "alert success show";
  submitButton.disabled = true;

  setTimeout(() => {
    window.open("", "_self");
    window.close();

    // 浏览器会阻止网页关闭由用户手动打开的标签页；此时退出到空白页。
    setTimeout(() => window.location.replace("about:blank"), 180);
  }, 900);
});
