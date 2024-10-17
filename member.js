function skillsMember() {
    return {
        restrict: 'E',
        templateUrl: 'app/components/members/skills.html',
        controller: 'skillsMemberCtrl',
        controllerAs: 'skillsMemberCtrl',
        bindToController: true,
        scope: {
            member: '=',
            showSkills: '=',
            showDetails: '='
        }
    };
}