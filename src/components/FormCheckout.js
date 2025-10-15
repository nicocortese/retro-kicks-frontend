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

function validateName(value) {
  let error;
  if (!value) {
    error = "El nombre es requerido";
  }
  return error;
}

function validateSurname(value) {
  let error;
  if (!value) {
    error = "El apellido es requerido";
  }
  return error;
}

export const CheckoutForm = ({handleAddOrder}) => (
  <div className="flex items-center justify-center">
    <div className="bg-[#1a1a1a] p-10 rounded-2xl shadow-2xl w-full max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-[#d64541] tracking-wide uppercase text-center">
        Datos del comprador
      </h2>

      <Formik
        initialValues={{
          name: "", // 👈 Siempre definidos
          surname: "",
          email: "",
        }}
        onSubmit={(values) => {
          console.log("Datos del formulario:", values);
          handleAddOrder(values);
        }}
      >
        {({ errors, touched, values }) => (
          <Form className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm mb-2 font-semibold text-[#ffefef]"
              >
                Nombre
              </label>
              <Field
                name="name"
                validate={validateName}
                value={values.name || ""}
                required
                className="w-full px-4 py-3 rounded-lg bg-[#272626] border border-[#ffefef] focus:border-[#d64541] focus:outline-none text-[#ffefef]"
              />
              {errors.name && touched.name && (
                <div className="text-red-400 text-sm mt-1">{errors.name}</div>
              )}
            </div>

            <div>
              <label
                htmlFor="surname"
                className="block text-sm mb-2 font-semibold text-[#ffefef]"
              >
                Apellido
              </label>
              <Field
                name="surname"
                validate={validateSurname}
                value={values.surname || ""}
                required
                className="w-full px-4 py-3 rounded-lg bg-[#272626] border border-[#ffefef] focus:border-[#d64541] focus:outline-none text-[#ffefef]"
              />
              {errors.surname && touched.surname && (
                <div className="text-red-400 text-sm mt-1">{errors.surname}</div>
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
                value={values.email || ""}
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
