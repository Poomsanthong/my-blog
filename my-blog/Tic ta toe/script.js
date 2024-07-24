const cells = document.querySelectorAll('.cell');
        let currentPlayer = 'X';
        let gameBoard = ['', '', '', '', '', '', '', '', ''];
        let gameActive = true;

        function handleCellClick(event) {
            const clickedCell = event.target;
            const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

            if (gameBoard[clickedCellIndex] === '' && gameActive) {
                gameBoard[clickedCellIndex] = currentPlayer;
                clickedCell.textContent = currentPlayer;
                if (checkWin(currentPlayer)) {
                    gameActive = false;
                    alert(`Player ${currentPlayer} wins!`);
                } else if (!gameBoard.includes('')) {
                    gameActive = false;
                    alert("It's a draw!");
                } else {
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                }
            }
        }

        function checkWin(player) {
            const winningConditions = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6]
            ];
            return winningConditions.some(combination => {
                return combination.every(index => {
                    return gameBoard[index] === player;
                });
            });
        }

        cells.forEach(cell => {
            cell.addEventListener('click', handleCellClick);
        });