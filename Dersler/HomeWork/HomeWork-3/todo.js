document.addEventListener('DOMContentLoaded', () => {
    let gorevler = JSON.parse(localStorage.getItem('gorevler')) || [];
    let currentEditIndex = null;
    gorevler.forEach((gorev, index) => {
        let li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        
        let divWrapper = document.createElement('div');

        let checkbox = document.createElement('input');
        checkbox.className = 'form-check-input me-1';
        checkbox.type = 'checkbox';
        checkbox.id = `checkbox-${index}`;

        let etiket = document.createElement('label');
        etiket.className = 'form-check-label';
        etiket.setAttribute('for', `checkbox-${index}`);
        etiket.textContent = gorev;

        divWrapper.appendChild(checkbox);
        divWrapper.appendChild(etiket);

        let buttonGroup = document.createElement('div');
        buttonGroup.className = 'btn-group';

        // Silme butonu oluştur
        let deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger btn-sm ms-2';
        deleteButton.textContent = 'Sil';
        deleteButton.addEventListener('click', () => {
            gorevler.splice(index, 1);
            localStorage.setItem('gorevler', JSON.stringify(gorevler));
            li.remove();
        });

        // Düzenleme butonu oluştur
        let editButton = document.createElement('button');
        editButton.className = 'btn btn-primary btn-sm ms-2';
        editButton.textContent = 'Düzenle';
        editButton.setAttribute('data-bs-toggle', 'modal');
        editButton.setAttribute('data-bs-target', '#exampleModal');

        editButton.addEventListener('click', () => {
           currentEditIndex = index;
           document.getElementById('modalInput').value = gorev;
          
          
        });

        buttonGroup.appendChild(editButton);
        buttonGroup.appendChild(deleteButton);

        li.appendChild(divWrapper);
        li.appendChild(buttonGroup);

        document.getElementById('taskList').appendChild(li);

        document.getElementById('taskId').value = '';
        
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                etiket.classList.add('crossed-out');
            } else {
                etiket.classList.remove('crossed-out');
            }
        });
    });
    document.getElementById('modalSave').addEventListener('click', () => {
        if (currentEditIndex !== null) {
            let newValue = document.getElementById('modalInput').value;
            gorevler[currentEditIndex] = newValue;
            localStorage.setItem('gorevler', JSON.stringify(gorevler));

            // Listeyi güncelle
            document.getElementById('taskList').children[currentEditIndex].querySelector('label').textContent = newValue;
            document.getElementById('modalInput').textContent=newValue;

            // Modal'ı kapat
            currentEditIndex = null;
            document.querySelector('.btn-close').click(); // Bootstrap için modal'ı kapatma yöntemi
        }
    });
});

document.getElementById('button-add').addEventListener('click', () => {
    let gorevInput = document.getElementById('taskId').value;
    let currentEditIndex = null;
     if (gorevInput) {
        let gorevler = JSON.parse(localStorage.getItem('gorevler')) || [];
        gorevler.push(gorevInput);
        localStorage.setItem('gorevler', JSON.stringify(gorevler));

        let li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';

        let divWrapper = document.createElement('div');

        let checkbox = document.createElement('input');
        checkbox.className = 'form-check-input me-1';
        checkbox.type = 'checkbox';
        checkbox.id = `checkbox-${gorevler.length - 1}`;

        let etiket = document.createElement('label');
        etiket.className = 'form-check-label';
        etiket.setAttribute('for', `checkbox-${gorevler.length - 1}`);
        etiket.textContent = gorevInput;

        divWrapper.appendChild(checkbox);
        divWrapper.appendChild(etiket);

        let buttonGroup = document.createElement('div');
        buttonGroup.className = 'btn-group'; 
       
        let deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger btn-sm ms-2';
        deleteButton.textContent = 'Sil';
        deleteButton.addEventListener('click', () => {
            let index = gorevler.indexOf(gorevInput);
            if (index !== -1) {
                gorevler.splice(index, 1);
                localStorage.setItem('gorevler', JSON.stringify(gorevler));
                li.remove();
            }
        });

        let editButton = document.createElement('button');
        editButton.className = 'btn btn-primary btn-sm ms-2';
        editButton.textContent = 'Düzenle';
        editButton.setAttribute('data-bs-toggle', 'modal');
        editButton.setAttribute('data-bs-target', '#exampleModal');
        
        editButton.addEventListener('click', () => {
            currentEditIndex = gorevler.indexOf(gorevInput);
           document.getElementById('modalInput').value = gorevInput;
        });

        buttonGroup.appendChild(editButton);
        buttonGroup.appendChild(deleteButton);

        li.appendChild(divWrapper);
        li.appendChild(buttonGroup);

        document.getElementById('taskList').appendChild(li);

        document.getElementById('taskId').value = '';

        checkbox.addEventListener('change', function() {
            if (this.checked) {
                etiket.classList.add('crossed-out');
            } else {
                etiket.classList.remove('crossed-out');
            }
        });
    }
    document.getElementById('modalSave').addEventListener('click', () => {
        if (currentEditIndex !== null) {
            let newValue = document.getElementById('modalInput').value;
            gorevler[currentEditIndex] = newValue;
            localStorage.setItem('gorevler', JSON.stringify(gorevler));

            document.getElementById('taskList').children[currentEditIndex].querySelector('label').textContent = newValue;
           

            currentEditIndex = null;
            document.querySelector('.btn-close').click();
        }
    });
});
