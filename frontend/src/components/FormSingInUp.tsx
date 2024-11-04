import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Tabs, Tab, Input, Link, Button, Card, CardBody } from "@nextui-org/react";
import axios from "axios";

type TabKey = "login" | "sign-up";

type FormData = {
  name: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
};

const useForm = (initialState: FormData) => {
  const [data, setData] = useState<FormData>(initialState);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = (selected: TabKey) => {
    const newErrors: Partial<FormData> = {};
    if (selected === "login") {
      if (!data.email) newErrors.email = "El email es requerido";
      if (!data.password) newErrors.password = "La contraseña es requerida";
    } else {
      if (!data.name) newErrors.name = "El nombre es requerido";
      if (!data.lastName) newErrors.lastName = "El apellido es requerido";
      if (!data.userName) newErrors.userName = "El nombre de usuario es requerido";
      if (!data.email) newErrors.email = "El email es requerido";
      if (!data.password) newErrors.password = "La contraseña es requerida";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { data, handleChange, errors, validateForm };
};

export default function FormSignInUp() {
  const [selected, setSelected] = useState<TabKey>("login");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const loginForm = useForm({ name: "", lastName: "", userName: "", email: "", password: "" });
  const registerForm = useForm({ name: "", lastName: "", userName: "", email: "", password: "" });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const currentForm = selected === "login" ? loginForm : registerForm;
    if (!currentForm.validateForm(selected)) return;

    try {
      if (selected === "login") {
        console.log("Intentando iniciar sesión con:", currentForm.data);
        const response = await axios.post("http://localhost:3000/auth/login", {
          email: currentForm.data.email,
          password: currentForm.data.password,
        });
        
        console.log("Respuesta del servidor:", response.data); // Verificar respuesta
        const token = response.data.token;
        localStorage.setItem("token", token);
        setMessage("Bienvenido a Timeboxing App");
        navigate('/tasks');
      } else {
        await axios.post("http://localhost:3000/auth/register", {
          name: currentForm.data.name,
          lastName: currentForm.data.lastName,
          userName: currentForm.data.userName,
          email: currentForm.data.email,
          password: currentForm.data.password,
        });

        const loginResponse = await axios.post("http://localhost:3000/auth/login", {
          email: currentForm.data.email,
          password: currentForm.data.password,
        });

        console.log("Respuesta del servidor después del registro:", loginResponse.data); // Verificar respuesta
        const token = loginResponse.data.token;
        if (token) {
          localStorage.setItem("token", token);
          setMessage("Registro exitoso, bienvenido");
          navigate('/tasks');
        } else {
          setMessage("Registro exitoso, pero hubo un problema al iniciar sesión");
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setMessage(error.response.data.message || "Hubo un error en la operación");
      } else {
        setMessage("Hubo un error inesperado");
      }
      console.error("Error en la solicitud:", error); // Detalle del error
    }
  };

  const renderForm = (formHook: ReturnType<typeof useForm>, isRegister: boolean) => (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      {isRegister && (
        <>
          <Input
            isRequired
            label="Primer Nombre"
            name="name"
            placeholder="John"
            value={formHook.data.name}
            onChange={formHook.handleChange}
            errorMessage={formHook.errors.name}
          />
          <Input
            isRequired
            label="Apellidos"
            name="lastName"
            placeholder="Doe"
            value={formHook.data.lastName}
            onChange={formHook.handleChange}
            errorMessage={formHook.errors.lastName}
          />
          <Input
            isRequired
            label="Nombre de usuario"
            name="userName"
            placeholder="johndoe"
            value={formHook.data.userName}
            onChange={formHook.handleChange}
            errorMessage={formHook.errors.userName}
          />
        </>
      )}
      <Input
        isRequired
        label="Email"
        name="email"
        placeholder="Enter your email"
        type="email"
        value={formHook.data.email}
        onChange={formHook.handleChange}
        errorMessage={formHook.errors.email}
      />
      <Input
        isRequired
        label="Password"
        name="password"
        placeholder="Enter your password"
        type="password"
        value={formHook.data.password}
        onChange={formHook.handleChange}
        errorMessage={formHook.errors.password}
      />

      <p className="text-center text-small">
        {isRegister ? "¿Ya eres miembro? " : "¿No tienes una cuenta? "}
        <Link size="sm" onPress={() => setSelected(isRegister ? "login" : "sign-up")}>
          {isRegister ? "Inicia sesión" : "Crea tu cuenta"}
        </Link>
      </p>
      <div className="flex gap-2 justify-end">
        <Button fullWidth color="primary" type="submit">
          {isRegister ? "Registrate" : "Inicia sesión"}
        </Button>
      </div>
    </form>
  );

  return (
    <div className="flex flex-col w-full">
      <Card className="max-w-full w-[340px] h-[400px]">
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            size="md"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={(key) => setSelected(key as TabKey)}
          >
            <Tab key="login" title="Inicia Sesión">
              {renderForm(loginForm, false)}
            </Tab>
            <Tab key="sign-up" title="Registrate">
              {renderForm(registerForm, true)}
            </Tab>
          </Tabs>
          {message && <p className="text-center text-red-500 mt-4">{message}</p>}
        </CardBody>
      </Card>
    </div>
  );
}
