

export async function loginValidation(inputData) {
    try {
        const res = await fetch('http://localhost:3000/admin/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(inputData)
        });

        const data = await res.json();
        return console.log(data);
    } catch (error) {
        console.log(error);
    }
}