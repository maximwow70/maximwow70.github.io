

function SelectFile(selectFile) {

    var input = selectFile.querySelector('.select_file-input');
    var fileList = selectFile.querySelector('.select_file-file_list');
    var btn = selectFile.querySelector('.select_file-btn');

    var actions = selectFile.querySelector('.select_file-actions');

    fileList.removeChild(actions);

    input.addEventListener('change', function () {
        var files = input.files;

        fileList.innerHTML = '';
        if (files.length === 0) {
            fileList.appendChild(btn);
        }
        for (var i = 0; i < files.length; i++) {
            var fileVM = document.createElement('div');
            fileVM.classList.add('select_file-file');
            fileVM.innerHTML = files[i].name;
            fileList.appendChild(fileVM);
        }
        if (files.length > 0) {
            fileList.appendChild(actions);
        }
    });

}


function initSelectsFile() {
    var selectsFile = document.querySelectorAll('.select_file');

    for (var i = 0; i < selectsFile.length; i++) {
        var selectFile = new SelectFile(selectsFile[i]);
    }

    [].forEach.call(document.querySelectorAll('.select_file-file_list'), function (el) {
        Ps.initialize(el, { theme: 'square' });
    });
}
window.addEventListener('load', initSelectsFile);