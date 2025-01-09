"use server";

export async function getHistoricalData(
  date: Date,
  latitude: number,
  longitude: number
) {
  const prompt = `
    Quiero saber qué estaba pasando exactamente en estas coordenadas en esta fecha: ${date.toISOString()}.

    Coordenadas: ${latitude}, ${longitude}

    Haz una historia ficticia sobre lo que estaba pasando. No es necesario que sea real, pero utiliza eventos e información reales para que sea lo más realista posible.

    Explícalo como si estuviera ahí parado. 

    Describe el clima, la gente, los edificios, la comida, el tráfico, las noticias, los eventos, la cultura, la historia, el clima.

    Si esta fecha es en el futuro, explica lo que sucederá, como en una historia de fantasía.
  `;

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta2/models/gemini-1.5-flash:generateText", // Endpoint correcto
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer AIzaSyCU1qmJq4NlFpTb72WlcJZVYOrzHRR-yxg`, // Clave de API
        },
        body: JSON.stringify({
          prompt: {
            text: prompt, // El prompt va dentro de un objeto "prompt" con la propiedad "text"
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `Error en la API de Gemini: ${response.status} - ${errorText}`
      );
      throw new Error(`Error en la API de Gemini: ${response.status}`); // Lanza el error para que se maneje en el catch
    }

    const data = await response.json();
    console.log("Respuesta de la API:", JSON.stringify(data, null, 2));

    if (data.candidates && data.candidates.length > 0) {
      console.log(data.candidates[0].output); // Accede a la propiedad 'output'
    } else {
      console.error("Respuesta inesperada:", data);
    }
  } catch (error) {
    console.error("Error al obtener datos históricos:", error);
  }
}
