import React from "react";
import { Formik, Form, Field } from "formik";

// ✅ Validaciones simplificadas
function validateEmail(value) {
  let error;
  if (!value) {
    error = "El email es requerido";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
    error = "Email inválido";
  }
  return error;
}

function validateUsername(value) {
  let error;
  if (!value) {
    error = "El nombre es requerido";
  }
  return error;
}

export const CheckoutForm = () => (
  <div className="flex items-center justify-center">
    <div className="bg-[#1a1a1a] p-10 rounded-2xl shadow-2xl w-full max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-[#d64541] tracking-wide uppercase text-center">
        Datos del comprador
      </h1>

      <Formik
        initialValues={{ username: "", email: "" }}
        onSubmit={(values) => {
          console.log("Datos del formulario:", values);
        }}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm mb-2 font-semibold  text-[#ffefef]"
              >
                Nombre
              </label>
              <Field
                name="username"
                validate={validateUsername}
                required
                className="w-full px-4 py-3 rounded-lg bg-[#272626] border border-[#ffefef] focus:border-[#d64541] focus:outline-none text-[#ffefef]"
              />
              {errors.username && touched.username && (
                <div className="text-red-400 text-sm mt-1">
                  {errors.username}
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm mb-2 font-semibold text-[#ffefef]"
              >
                Email
              </label>
              <Field
                name="email"
                type="email"
                validate={validateEmail}
                required
                className="w-full px-4 py-3 rounded-lg bg-[#272626] border border-[#ffefef] focus:border-[#d64541] focus:outline-none text-[#ffefef]"
              />
              {errors.email && touched.email && (
                <div className="text-red-400 text-sm mt-1">{errors.email}</div>
              )}
            </div>

            <button
              type="submit"
              className="mt-6 bg-[#d64541] hover:bg-red-700 text-[#ffefef] font-bold py-3 rounded-lg text-lg transition-transform duration-300 hover:scale-[1.02] shadow-md hover:shadow-lg"
            >
              Finalizar compra
            </button>
          </Form>
        )}
      </Formik>
    </div>
  </div>
);
