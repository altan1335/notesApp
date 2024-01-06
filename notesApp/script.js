const addNote = document.getElementById('add');

const notes = JSON.parse(localStorage.getItem('notes'));

if (notes) {
	notes.forEach((note) => generateNote(note));
}

addNote.addEventListener('click', () => generateNote());

function generateNote(text = '') {
	const newNote = document.createElement('div');
	newNote.classList.add('note');

	newNote.innerHTML = `
    <div class="tools">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="trash"><i class="fas fa-trash-alt"></i></button>
    </div>

    <div class="main ${text ? '' : 'hidden'}"></div>
    <textarea class = "${text ? 'hidden' : ''}"></textarea>`;

	const editButton = newNote.querySelector('.edit');
	const deleteButton = newNote.querySelector('.trash');
	const main = newNote.querySelector('.main');
	const textArea = newNote.querySelector('textarea');

	textArea.value = text;
	main.innerHTML = marked(text);

	deleteButton.addEventListener('click', () => {
		newNote.remove();

		updateLs();
	});

	editButton.addEventListener('click', () => {
		main.classList.toggle('hidden');
		textArea.classList.toggle('hidden');
	});

	textArea.addEventListener('input', (e) => {
		const { value } = e.target;

		main.innerHTML = marked(value);

		updateLs();
	});

	document.body.appendChild(newNote);
}

function updateLs() {
	const notesText = document.querySelectorAll('textarea');

	const notes = [];

	notesText.forEach((note) => notes.push(note.value));

	localStorage.setItem('notes', JSON.stringify(notes));
}

// Store only string
// localStorage.setItem('name', 'Brad');
// localStorage.getItem('name');
// localStorage.removeItem('name')
