import { btnCloseForm, svgSpinSave } from "./globalSvg.js";
//модалка удаления
export function deleteClientModal() {
    const deleteModalContent = document.createElement('div');
    const modalClose = document.createElement('button');
    const deleteModalTitle = document.createElement('h2');
    const deleteModalText = document.createElement('p');
    const deleteModal = document.createElement('div');
    const deleteModalDelete = document.createElement('button');
    const deleteModalBack = document.createElement('button');
    const deleteSpinner = document.createElement('span');

    deleteSpinner.classList.add('modal__spinner');
    deleteModal.classList.add('modal', 'active-modal');
    deleteModalContent.classList.add('modal__box', 'active-modal');
    modalClose.classList.add('btn__close', 'btn-reset');
    deleteModalTitle.classList.add('modal__title', 'delete-title');
    deleteModalText.classList.add('modal__text');
    deleteModalDelete.classList.add('btn-reset', 'modal__delete');
    deleteModalBack.classList.add('btn-reset', 'modal__close', 'modal__back');

    deleteSpinner.innerHTML = svgSpinSave;
    deleteModalTitle.textContent = 'Удалить клиента';
    deleteModalText.textContent = 'Вы действительно хотите удалить данного клиента?';
    deleteModalDelete.textContent = 'Удалить';
    deleteModalBack.textContent = 'Отмена';
    modalClose.innerHTML = btnCloseForm;


    deleteModalDelete.append(deleteSpinner);
    deleteModalContent.append(
        modalClose,
        deleteModalTitle,
        deleteModalText,
        deleteModalDelete,
        deleteModalBack,
    )
    deleteModal.append(deleteModalContent);

    modalClose.addEventListener('click', () => {deleteModal.remove();})//закрытие на крестик

    deleteModalBack.addEventListener('click', () => {deleteModal.remove();}) //закрытие окна на отмену

    window.addEventListener('click', (e) => {
        if (e.target === deleteModal) {//закрытие модалки вне окна
            deleteModal.remove();
        }
    })

    return {
        deleteModal,
        deleteModalContent,
        deleteModalDelete,
        deleteModal,
        deleteSpinner
    }

}