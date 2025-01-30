"use strict";
let transacciones = [];
function agregarTransaccion(tipo) {
    const montoInput = document.getElementById("monto");
    const descripcionInput = document.getElementById("descripcion");
    const monto = parseFloat(montoInput.value);
    const descripcion = descripcionInput.value.trim();
    if (isNaN(monto) || monto <= 0 || descripcion === "") {
        alert("El monto debe ser positivo y la descripción no debe estar vacía.");
        return;
    }
    if (tipo === "gasto" && monto > calcularBalance()) {
        alert("El gasto no puede ser mayor que el balance actual.");
        return;
    }
    const nuevaTransaccion = {
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
function calcularBalance() {
    const ingresos = transacciones.filter(t => t.tipo === "ingreso").reduce((acc, t) => acc + t.monto, 0);
    const gastos = transacciones.filter(t => t.tipo === "gasto").reduce((acc, t) => acc + t.monto, 0);
    return ingresos - gastos;
}
function actualizarInterfaz() {
    document.getElementById("balance").textContent ='$'+ calcularBalance().toString();
    const historial = document.getElementById("historial");
    historial.innerHTML = "";
    transacciones.forEach(t => {
        const li = document.createElement("li");
        li.textContent = `${t.descripcion} - $${t.monto} (${t.tipo})`;
        li.className = `transaction ${t.tipo}`;
        historial.appendChild(li);
    });
}
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btnIngreso").addEventListener("click", () => agregarTransaccion("ingreso"));
    document.getElementById("btnGasto").addEventListener("click", () => agregarTransaccion("gasto"));
});
