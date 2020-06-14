
 $(document).ready(function () {
 
  $('td').keydown(function(e){
    switch (e.keyCode) {
      case 37:
        $(this).closest('td').prev().focus();
        break;

      case 38:
        $(this).closest('tr').prev().find('td:eq(' + $(this).closest('td').index() + ')').focus();
        break;
       
      case 39:
        $(this).closest('td').next().focus();
        break;

      case 40:
        $(this).closest('tr').next().find('td:eq(' + $(this).closest('td').index() + ')').focus();
        break;
    }
  });

  $(".readOnly").attr("readonly", true);

 });