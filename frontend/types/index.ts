export type CustomerType = {
  id: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  genero: string;
  email: string;
  telefono: string;
  fecha_nacimiento: string;
  matricula: string;
};

export type CustomersType = CustomerType[];

export type MembershipType = {
  id: number;
  nombre: string;
  beneficios: string[];
  duracion_dias: number;
  precio: number;
};

export type MembershipsType = MembershipType[];
