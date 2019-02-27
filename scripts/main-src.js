var width       = null,
	height      = null,
	cell        = null,
	board       = null,
	param       = 0.7,
	body        = document.querySelector('body'),
	dragableDiv = null;

getSize();
createBoard();
addFigure();

// создание клеток
function createCell() {
	var flag  = true,
		board = document.querySelector('.board');
	for (var i = 0; i < 8; i++) {
		for (var j = 0; j < 8; j++) {
			if (j == 0) {
				flag = !flag;
			}
			cell = document.createElement('div');
			if (flag) {
				cell.className = 'cell black';
			} else {
				cell.className ='cell white';
			}
			board.appendChild(cell);
			if (height < width) {
				cell.style.width = (height / 8) * param + 'px';
				cell.style.height = (height / 8) * param + 'px';
			} else {
				cell.style.width = (width / 8) * param + 'px';
				cell.style.height = (width / 8) * param + 'px';
			}
			flag = !flag;
		}
	}
}

// создание доски
function createBoard() {
	board = document.createElement('div');
	if (height < width) {
		board.style.width = param * height + 'px';
		board.style.height = param * height + 'px';
	} else {
		board.style.width = param * width + 'px';
		board.style.height = param * width + 'px';
	}
	body.appendChild(board).classList.add('board');
	createCell();
}
function getSize() {
	width  = window.innerWidth;
	height = window.innerHeight;
}

// создание элемента который будет содержать фигуру
function addFigure() {
	var cellBlock = document.querySelectorAll('.cell'),
		figure    = null;
	for (var i = 0; i < cellBlock.length; i++) {
		figure = document.createElement('div');
		figure.classList.add('figure');
		figure.style.top = 0;
		figure.style.left = 0;
		figure.style.backgroundSize = cell.style.width;
		cellBlock[i].appendChild(figure);
	}
	addFigureChess();
}

// добавление фигур на доску
function addFigureChess() {
	var figureBlock = document.querySelectorAll('.figure');
	for (var i = 0; i < figureBlock.length; i++) {
		switch (i) {
			case 0:
			case 7:
				figureBlock[i].classList.add('rook-black');
				break;
			case 1:
			case 6:
				figureBlock[i].classList.add('knight-black');
				break;
			case 2:
			case 5:
				figureBlock[i].classList.add('bishop-black');
				break;
			case 3:
				figureBlock[i].classList.add('king-black');
				break;
			case 4:
				figureBlock[i].classList.add('queen-black');
				break;
			case 8:
			case 9:
			case 10:
			case 11:
			case 12:
			case 13:
			case 14:
			case 15:
				figureBlock[i].classList.add('pawn-black');
				break;
			case 48:
			case 49:
			case 50:
			case 51:
			case 52:
			case 53:
			case 54:
			case 55:
				figureBlock[i].classList.add('pawn-white');
				break;
			case 56:
			case 63:
				figureBlock[i].classList.add('rook-white');
				break;
			case 57:
			case 62:
				figureBlock[i].classList.add('knight-white');
				break;
			case 58:
			case 61:
				figureBlock[i].classList.add('bishop-white');
				break;
			case 59:
				figureBlock[i].classList.add('king-white');
				break;
			case 60:
				figureBlock[i].classList.add('queen-white');
				break;
		}
	}
}

moveFigure();

// перемещение фигуры
function moveFigure() {
	board.addEventListener('mousedown', function(e) {
		var target = e.target,
			targetClass = target.className,
			dragableDivWidth = null,
			dragableDivHeight = null;

		// создание элемента для drag and drop
		dragableDiv = document.createElement('div');
		dragableDiv.className = targetClass;
		dragableDiv.style.position = 'fixed';
		dragableDiv.style.backgroundSize = cell.style.width;
		dragableDiv.style.width = cell.style.width;
		dragableDiv.style.height = cell.style.height;
		dragableDivWidth = parseInt(dragableDiv.style.width, 10);
		dragableDivHeight = parseInt(dragableDiv.style.height, 10);
		dragableDiv.style.top = (e.clientY - dragableDivHeight / 2) + 'px';
		dragableDiv.style.left = (e.clientX - dragableDivWidth / 2) + 'px';
		dragableDiv.setAttribute('id', 'draggable');
		board.appendChild(dragableDiv);
		target.className = 'figure';
		if(e.type == 'mousedown') {
			board.addEventListener('mousemove', function(e){
				dragableDiv.style.top = (e.clientY - dragableDivHeight / 2) + 'px';
				dragableDiv.style.left = (e.clientX - dragableDivWidth / 2) + 'px';
			});
		}
	});
	board.addEventListener('mouseup', function(e) {
		dragableDiv.removeAttribute('id');
		dragableDiv.remove();
	});
}