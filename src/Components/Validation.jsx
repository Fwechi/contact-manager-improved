export default function Validation(values) {
  let errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

  //conditional optional statement for if name exists or not for login and register page
  console.log({ emailRegex, passwordRegex });
  if (values?.name) {
    if (values.name === "") {
      errors.name = "Name should not be empty";
    } else if (values.name.length < 3 || values.name.length > 15) {
      errors.name = "Name must be between 3 -20";
    } else {
      errors.name = "";
    }
  }

  if (values.email === "") {
    errors.email = "Email should not be empty";
  } /* else if (!emailRegex.test(values.email)) {
    errors.email = "Invalid email format";
  } */ else {
    errors.email = "";
  }

  if (values.password === "") {
    errors.password = "Password should not be empty";
  } /* else if (!passwordRegex.test(values.password)) {
    errors.password =
      "Password must be at least 8 characters, include 1 letter, 1 number and 1 special character";
  }  */ else {
    errors.password = "";
  }

  return errors;
}
