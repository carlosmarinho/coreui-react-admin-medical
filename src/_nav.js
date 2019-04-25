export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
    },
    {
      title: true,
      name: 'Médicos',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Listar Médicos',
      url: '/medicos',
      icon: 'icon-people',
    },
    {
      name: 'Adicionar Médico',
      url: '/medicos/novo',
      icon: 'icon-user-follow',
    },
    {
      name: 'Pesquisar Médicos',
      url: '/theme/colors',
      icon: 'icon-directions',
    },
    
    {
      divider: true,
    },

    {
      title: true,
      name: 'Especialidade ',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Listar Especialidade ',
      url: '/theme/colors',
      icon: 'icon-layers',
    },
    {
      name: 'Add Especialidade',
      url: '/theme/colors',
      icon: 'icon-note',
    },
    {
      name: 'Buscar Especialidade ',
      url: '/theme/colors',
      icon: 'icon-directions',
    },
  ],
};
