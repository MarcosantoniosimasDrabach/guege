 // Variáveis para armazenar valores mínimo e máximo
        let minPressure = 1000;
        let maxPressure = 0;
        
        // Função para desenhar o medidor de pressão com círculo completo
        function drawPressureGauge(value) {
            const canvas = document.getElementById('pressureGauge');
            const ctx = canvas.getContext('2d');
            const width = canvas.width;
            const height = canvas.height;
            const centerX = width / 2;
            const centerY = height / 2;
            const radius = Math.min(centerX, centerY) - 15;
            
            // Limpar canvas
            ctx.clearRect(0, 0, width, height);
            
            // Desenhar fundo do medidor
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            ctx.fillStyle = 'rgba(30, 40, 55, 0.9)';
            ctx.fill();
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Desenhar arco do medidor com gradiente (360 graus completo)
            const gradient = ctx.createLinearGradient(0, 0, width, 0);
            gradient.addColorStop(0, '#006400');  // Verde
            gradient.addColorStop(0.5, '#ff8c00'); // Laranja
            gradient.addColorStop(1, '#8b0000');   // Vermelho
            
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius - 10, 0, 2 * Math.PI, false);
            ctx.lineWidth = 20;
            ctx.strokeStyle = gradient;
            ctx.stroke();
            
            // Desenhar marcadores no círculo completo
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.lineWidth = 2;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 12px Arial';
            
            for (let i = 0; i < 36; i++) {
                const angle = (i / 36) * 2 * Math.PI;
                const startX = centerX + Math.cos(angle) * (radius - 25);
                const startY = centerY + Math.sin(angle) * (radius - 25);
                const endX = centerX + Math.cos(angle) * (radius - 15);
                const endY = centerY + Math.sin(angle) * (radius - 15);
                
                ctx.beginPath();
                ctx.moveTo(startX, startY);
                ctx.lineTo(endX, endY);
                ctx.stroke();
                
                // Adicionar números a cada 5 marcadores
                if (i % 5 === 0) {
                    const value = (i / 36) * 1000;
                    const textX = centerX + Math.cos(angle) * (radius - 40);
                    const textY = centerY + Math.sin(angle) * (radius - 40);
                    ctx.fillText(Math.round(value), textX, textY);
                }
            }
            
            // Calcular ângulo do ponteiro (0 a 1000 kPa)
            const minValue = 0;
            const maxValue = 1000;
            const angle = (value / maxValue) * 2 * Math.PI;
            
            // Desenhar ponteiro
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(
                centerX + Math.cos(angle) * (radius - 30),
                centerY + Math.sin(angle) * (radius - 30)
            );
            ctx.lineWidth = 5;
            ctx.strokeStyle = '#fff';
            ctx.stroke();
            
            // Desenhar centro do ponteiro
            ctx.beginPath();
            ctx.arc(centerX, centerY, 10, 0, Math.PI * 2, false);
            ctx.fillStyle = '#ff6b6b';
            ctx.fill();
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Atualizar valor no display retangular
            document.getElementById('gaugeValue').textContent = value.toFixed(1);
        }
        
        // Função para atualizar o display
        function updateDisplay(value) {
            const display = document.getElementById('pressureValue');
            display.textContent = value.toFixed(1).padStart(6, '0');
            
            // Atualizar valor atual
            document.getElementById('currentValue').textContent = value.toFixed(1);
            
            // Atualizar valores mínimo e máximo
            if (value < minPressure) {
                minPressure = value;
                document.getElementById('minValue').textContent = minPressure.toFixed(1);
            }
            
            if (value > maxPressure) {
                maxPressure = value;
                document.getElementById('maxValue').textContent = maxPressure.toFixed(1);
            }
        }
        
        // Inicializar o medidor
        drawPressureGauge(0);
        updateDisplay(0);
        
        // Configurar o controle deslizante
        document.getElementById('pressureSlider').addEventListener('input', function() {
            const value = parseInt(this.value);
            updateDisplay(value);
            drawPressureGauge(value);
        });
        
        // Adicionar fonte digital
        const style = document.createElement('style');
        style.innerHTML = `
            @font-face {
                font-family: 'Digital';
                src: local('DS-Digital'), local('Digital-7'),
                    url('https://fonts.cdnfonts.com/s/12674/DS-Digital.woff') format('woff');
                font-weight: normal;
                font-style: normal;
            };

        document.head.appendChild(style);
