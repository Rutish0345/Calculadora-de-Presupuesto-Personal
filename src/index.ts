type TipoTransaccion = 'ingreso' | 'gasto';

interface Transaccion {
  id: number;
  monto: number;
  descripcion: string;
  tipo: TipoTransaccion;
}

let transacciones: Transaccion[] = [];

function agregarTransaccion(tipo: TipoTransaccion): void {
  const montoInput = document.getElementById("monto") as HTMLInputElement;
  const descripcionInput = document.getElementById("descripcion") as HTMLInputElement;
  const monto = parseFloat(montoInput.value);
  const descripcion = descripcionInput.value.trim();

  if (isNaN(monto) || monto <= 0 || descripcion === "") {
    alert("El monto debe ser positivo y la descripción no debe estar vacía.");
    return;
  }

  if (tipo === 'gasto' && monto > calcularBalance()) {
    alert("El gasto no puede ser mayor que el balance actual.");
    return;
  }

  const nuevaTransaccion: Transaccion = {
    id: transacciones.length + 1,
    monto,
    descripcion,
    tipo,
  };

  transacciones.push(nuevaTransaccion);
  montoInput.value = "";
  descripcionInput.value = "";
  actualizarInterfaz();
}

function calcularBalance(): number {
  const ingresos = transacciones.filter(t => t.tipo === "ingreso").reduce((acc, t) => acc + t.monto, 0);
  const gastos = transacciones.filter(t => t.tipo === "gasto").reduce((acc, t) => acc + t.monto, 0);
  return ingresos - gastos;
}

function actualizarInterfaz(): void {
  document.getElementById("balance")!.textContent = '$'+ calcularBalance().toString();

  const historial = document.getElementById("historial") as HTMLUListElement;
  historial.innerHTML = "";
  transacciones.forEach((t) => {
    const li = document.createElement("li");
    li.textContent = `${t.descripcion} - $${t.monto} (${t.tipo})`;
    li.className = `transaction ${t.tipo}`;
    historial.appendChild(li);
  });
}
(window as any).agregarTransaccion = agregarTransaccion;
