app.controller("SignInController", function (Auth) {

  let vm = this;

  let constructor = function () {
    vm.form = {
      data: {},
      loading: false,
      error: false,
    };
  };

  vm.submit = function () {
    vm.form.loading = true;
    Auth.signIn(vm.form.data.username, vm.form.data.password, function () {
      vm.form.loading = false;
      vm.form.error = false;
    }, function () {
      vm.form.loading = false;
      vm.form.error = true;
    });
  };

  constructor();
});
