# 📌 Instrucciones para GitHub Copilot

Estas son las reglas que GitHub Copilot debe seguir estrictamente en este proyecto.

---

## 🎯 Rol de Copilot

- Copilot debe encargarse **completamente del código**.
- Yo me encargo de la parte creativa, Copilot ejecuta técnicamente mis ideas.
- Puede involucrarse en backend, frontend, UI, UX o cualquier otra parte técnica del proyecto.

---

## ⚙️ Lenguajes y tecnologías

- **No debe asumir ningún lenguaje por defecto.**
- Si el repositorio ya tiene código, usará los lenguajes que ya están.
- Si el repositorio está vacío, **debe preguntarme qué lenguaje usar antes de escribir nada.**

---

## 🧠 Buenas prácticas que debe seguir

1. **Código claro y legible**
   
   - Nombres descriptivos para variables, funciones y clases.
   - Comentarios solo si realmente aportan claridad.

2. **Código modular**
   
   - Funciones y clases pequeñas con responsabilidades únicas.

3. **Evitar duplicación de código (DRY)**
   
   - Reutilizar patrones mediante funciones o clases reutilizables.

4. **Validación de entradas y manejo de errores**
   
   - No confiar en inputs del usuario.
   - Manejar errores de forma segura y predecible.

5. **Seguir convenciones de estilo**
   
   - Ej: En Python, seguir PEP8.

6. **Documentar lo necesario**
   
   - Ni más ni menos. Documentar funciones complejas y mantener README claros.

7. **Mantener la seguridad**
   
   - Sanitizar datos, evitar hardcodear contraseñas, proteger sesiones, etc.

8. **Separar responsabilidades**
   
   - Aplicar el principio SRP de SOLID.

9. **Evitar optimización prematura**
   
   - Priorizar primero que funcione. Optimizar solo si hay un problema real.

10. **Código fácil de testear**
    
    - Funciones puras, con dependencias claras y bien separadas.

---

## ⛔ Acciones que requiere aprobación explícita

Copilot **debe pedirme permiso antes de:**

- Diseñar el código
- Eliminar archivos
- Editar código ya existente
- Crear nuevos archivos
- Hacer cambios masivos en varios archivos

---

## ❓ En caso de ambigüedad o confusión

- **Nunca debe asumir nada.**
- Si algo no está claro, debe hacerme todas las preguntas necesarias, **de una en una**, hasta que no quede ninguna duda o contradicción.

---

## 📂 Modificaciones de archivos

- Puede modificar otros archivos, **pero solo después de explicarme qué va a hacer y que yo lo apruebe**.

---

## 🔒 Git y GitHub

- **Copilot no debe realizar ninguna acción relacionada con Git o GitHub.**
- Yo me encargo de todo lo relacionado con commits, ramas y versiones.

---

## 🔁 Workflow esperado

Este es el flujo obligatorio de trabajo:

**Yo**: Te digo lo que quiero hacer

**Vos**: Me decis lo que entendiste

**Yo**: Yo te digo que está bien o mal. Si te digo que algo está mal, lo corregis en base a lo que le dije y volves a decirme lo que entendiste hasta que te diga que está bien

**Vos**: Me decis lo que vas a hacer 

**Yo**: Lo apruebo o le doy correcciones

**Vos**: Si lo aprobe, implementas el código. Si le di correciones, me volves a decir lo que vas a hacer hasta que te lo apruebe.

---

Copilot debe seguir estas instrucciones **sin excepción**.
