export const configUserDashboardLinks = (userDashboardLinks = []) => {
  const url = location.href;
  let currentActive = 0;

  for (let index = 0; index < userDashboardLinks.length; index++) {
    const item = userDashboardLinks[index];
    userDashboardLinks[index].id = `link_${item.href}`;
    delete userDashboardLinks[index].active;

    if (url.indexOf(item.href) >= 0) {
      delete userDashboardLinks[currentActive].active;
      userDashboardLinks[index].active = true;
      currentActive = index;
    }
  }
  return userDashboardLinks;
};

export const getCurrentProductActiveTab = () => {
  let activeTab = 0;
  const url = location.href;

  const links = [
    {
      url: "/",
      tab: 0,
    },
    {
      url: "/carrito",
      tab: 0,
    },
    {
      url: "/ordenes",
      tab: 1,
    },
    {
      url: "/lista-deseos",
      tab: 2,
    },
    {
      url: "/comparacion",
      tab: 3,
    },
  ];

  links.forEach((link) => {
    if (url.indexOf(link.url) >= 0) {
      activeTab = link.tab;
    }
  });

  return activeTab;
};
