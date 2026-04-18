import $ from 'jquery';
import 'jquery-validation';
import 'jquery.inputmask';

export function initValid() {
  const form = $('.static-form-1 form');

  if (!form.length) return;

  // Маска для суммы (только цифры)
  $('input[name="amount"]').inputmask({
    regex: '[0-9]*',
    placeholder: '',
  });

  // Добавляем собственный метод проверки на наличие файла
  $.validator.addMethod(
    'fileRequired',
    function (_value, element) {
      return element.files && element.files.length > 0;
    },
    'Пожалуйста, загрузите файл.'
  );

  // Инициализация валидации
  form.validate({
    ignore: [], // важно, чтобы не игнорировать readonly поля
    rules: {
      name: {
        required: true,
        minlength: 2,
      },
      purpose: {
        required: true,
        minlength: 2,
      },
      message: {
        required: true,
        minlength: 10,
      },
      file: {
        fileRequired: true,
      },
      amount: {
        required: true,
        minlength: 2,
        digits: true,
      },
    },
    messages: {
      name: {
        required: 'Введите имя.',
        minlength: 'Минимум 2 символа.',
      },
      purpose: {
        required: 'Укажите цель.',
        minlength: 'Минимум 2 символа.',
      },
      message: {
        required: 'Введите описание.',
        minlength: 'Минимум 10 символов.',
      },
      file: {
        fileRequired: 'Загрузите файл.',
      },
      amount: {
        required: 'Введите сумму.',
        minlength: 'Минимум 2 цифры.',
        digits: 'Только цифры.',
      },
    },
    errorElement: 'span',
    errorClass: 'input-error',
    highlight: function (element) {
      $(element).addClass('error');
    },
    unhighlight: function (element) {
      $(element).removeClass('error');
    },
    submitHandler: function (formEl) {
      // пример отправки формы
      console.log('Форма прошла валидацию');
      formEl.submit();
    },
  });

  const purposeInput = form.find('input[name="purpose"]');
  if (purposeInput.length) {
    purposeInput.on('change', function () {
      // Проверяем валидность именно этого поля
      $(this).valid();
    });
  }
}
