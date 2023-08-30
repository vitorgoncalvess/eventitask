"use client";

import Input from "./(components)/Input";
import Button from "./(components)/Button";
import { FormEvent, useState } from "react";
import axiosInstance from "./(axios)/config";
import { useRouter } from "next/navigation";
import Logo from "./(components)/Logo";

export default function Home() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const router = useRouter();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    axiosInstance
      .post("/usuarios", { email, senha })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("id", response.data.id);
          axiosInstance.get("/boards").then((response: any) => {
            const { boards } = response.data;
            if (boards.length === 0) {
              router.push("/home");
            } else {
              router.push(`/home/${boards[0].id}`);
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <section className="relative bg-primary h-[500px] w-[500px] drop-shadow-sm flex flex-col p-8 py-12 items-center rounded-md justify-between">
        <div className="flex items-center absolute left-4 top-4 select-none">
          <Logo size="base" />
        </div>
        <h1 className="text-2xl">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full">
          <Input value={email} setValue={setEmail} label="E-mail" />
          <Input
            type="password"
            value={senha}
            setValue={setSenha}
            label="Senha"
          />
          <div className="flex flex-row-reverse items-center justify-evenly">
            <Button background="base" size="auto">
              Entrar
            </Button>
            <Button background="transparent" size="auto">
              Cadastrar
            </Button>
          </div>
        </form>
        <h1 className="text-3xl font-medium">EventiTask</h1>
      </section>
    </div>
  );
}
