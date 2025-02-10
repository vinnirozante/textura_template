document.addEventListener("DOMContentLoaded", function () {
    const uploadInput = document.getElementById("uploadInput");
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const downloadBtn = document.getElementById("downloadBtn");

    // Defina as dimensões do canvas (exemplo: 800x600)
    canvas.width = 800;
    canvas.height = 600;

    // Carregar o template de fundo (opcional)
    const template = new Image();
    template.src = "template.png"; // Nome do arquivo do template
    template.onload = function () {
        ctx.drawImage(template, 0, 0, canvas.width, canvas.height);
    };

    uploadInput.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const img = new Image();
                img.src = e.target.result;
                img.onload = function () {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(template, 0, 0, canvas.width, canvas.height); // Redesenha o template
                    ctx.drawImage(img, 100, 100, 600, 400); // Ajuste a posição/tamanho da imagem
                };
            };
            reader.readAsDataURL(file);
        }
    });

    downloadBtn.addEventListener("click", function () {
        const link = document.createElement("a");
        link.download = "imagem_personalizada.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
});

