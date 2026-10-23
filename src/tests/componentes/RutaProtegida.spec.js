import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import RutaProtegida from "../../components/RutaProtegida";
import { SesionProvider } from "../../context/SesionContext";
import { simularLocalStorage, futuro } from "../ayudantes";

function renderizarConSesion(usuario, soloAdmin = false) {
  simularLocalStorage(usuario ? { gm_sesion: JSON.stringify(usuario) } : {});
  return render(
    <SesionProvider>
      <MemoryRouter future={futuro} initialEntries={["/admin/usuarios"]}>
        <Routes>
          <Route path="/login" element={<p>Pagina de login</p>} />
          <Route
            path="/admin/usuarios"
            element={
              <RutaProtegida soloAdmin={soloAdmin}>
                <p>Contenido privado</p>
              </RutaProtegida>
            }
          />
        </Routes>
      </MemoryRouter>
    </SesionProvider>
  );
}

describe("RutaProtegida", () => {
  it("manda al login si no hay sesion iniciada", () => {
    renderizarConSesion(null);

    expect(screen.getByText("Pagina de login")).toBeTruthy();
    expect(screen.queryByText("Contenido privado")).toBeNull();
  });

  it("muestra acceso restringido a un cliente", () => {
    renderizarConSesion({ nombre: "Camila", tipo: "Cliente" });

    expect(screen.getByText("Acceso restringido")).toBeTruthy();
    expect(screen.queryByText("Contenido privado")).toBeNull();
  });

  it("deja pasar a un vendedor a una ruta normal del panel", () => {
    renderizarConSesion({ nombre: "Pedro", tipo: "Vendedor" });

    expect(screen.getByText("Contenido privado")).toBeTruthy();
  });

  it("bloquea al vendedor en una ruta solo para administradores", () => {
    renderizarConSesion({ nombre: "Pedro", tipo: "Vendedor" }, true);

    expect(screen.getByText("Acceso restringido")).toBeTruthy();
  });

  it("deja pasar al administrador a las rutas solo para administradores", () => {
    renderizarConSesion({ nombre: "Ana", tipo: "Administrador" }, true);

    expect(screen.getByText("Contenido privado")).toBeTruthy();
    expect(localStorage.getItem).toHaveBeenCalledWith("gm_sesion");
  });
});
