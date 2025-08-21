/* eslint-disable @typescript-eslint/no-explicit-any */
export type HttpErrorHandler = (error: any) => {
  title?: string;
  message: string;
  status: number | null;
};

export const HttpErrorHandler: HttpErrorHandler = (error: any) => {
  // Verificar si el error es una cancelación de la solicitud
  if (error.message === "CANCEL" || error.message === "canceled") {
    return { message: "La solicitud fue cancelada", status: null };
  }

  // Verificar si el error tiene una respuesta (errores de la API)
  if (error.response) {
    const { status, data } = error.response;

    // Manejar errores comunes por status
    switch (status) {
      case 400:
        return {
          message:
            data?.error ||
            data?.message ||
            error?.error ||
            error?.message ||
            "Solicitud incorrecta",
          status,
        };
      case 401:
        return {
          title: "No autorizado",
          message:
            "Si después de iniciar sesión ves este mensaje, recarga el navegador.",
          status,
        };
      case 403:
        return { message: "Prohibido", status };
      case 404:
        return { message: "Recurso no encontrado", status };
      case 500:
        return {
          message:
            data?.error ||
            data?.message ||
            error?.error ||
            error?.message ||
            "Error interno del servidor",
          status,
        };
      default:
        return {
          message:
            data?.error ||
            data?.message ||
            error?.error ||
            error?.message ||
            "Error inesperado",
          status,
        };
    }
  }

  if (error.request) {
    return {
      title: "Error de red",
      message: "No se recibió respuesta del servidor. consulta a soporte!",
      status: null,
    };
  }

  // Otros errores (por ejemplo, errores al construir la solicitud)
  return {
    message: error.message || "Error inesperado",
    status: null,
  };
};

const service = {
  HttpErrorHandler,
};

export default service;
