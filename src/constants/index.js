import i18n from 'i18next';

i18n.on('languageChanged', (language) => {
  UserRoles[0].name = i18n.t('translation:UserRoles-Admin');
  UserRoles[1].name = i18n.t('translation:UserRoles-Author');
  UserRoles[2].name = i18n.t('translation:UserRoles-Editor');
  UserRoles[3].name = i18n.t('translation:UserRoles-Contributor');
  StatusTypes[0].name = i18n.t('translation:StatusTypes-Active');
  StatusTypes[1].name = i18n.t('translation:StatusTypes-Inactive');
  StatusTypes[2].name = i18n.t('translation:StatusTypes-Pending');
  StatusTypes[3].name = i18n.t('translation:StatusTypes-Suspended');
});

/* eslint-disable import/prefer-default-export */
export const THEMES = {
  LIGHT: 'LIGHT',
  ONE_DARK: 'ONE_DARK',
  UNICORN: 'UNICORN'
};

export const LANGUAGES = [
  {
    name: 'English',
    code: 'EN'
  },
  {
    name: 'Español',
    code: 'ES'
  }
]

export const UserRoles = [
  {
    id: 'Admin',
    name: 'Admin'
  },
  {
    id: 'Author',
    name: 'Author'
  },
  {
    id: 'Editor',
    name: 'Editor'
  },
  {
    id: 'Contributor',
    name: 'Contributor'
  }
];

export const StatusTypes = [
  {
    id: 'Active',
    name: 'Active'
  },
  {
    id: 'Inactive',
    name: 'Inactive'
  },
  {
    id: 'Pending',
    name: 'Pending'
  },
  {
    id: 'Suspended',
    name: 'Suspended'
  }
];

export const SectionStatus = [
  {
    id: 'Active',
    name: 'Active'
  },
  {
    id: 'Inactive',
    name: 'Inactive'
  },
  {
    id: 'Cancelled',
    name: 'Cancelled'
  }
];

export const PhotoSizes = [
  {
    id: 'df',
    name: 'Default'
  },
  {
    id: 'sm',
    name: 'Small'
  },
  {
    id: 'md',
    name: 'Medium'
  },
  {
    id: 'lg',
    name: 'Large'
  },
  {
    id: 'xl',
    name: 'Extra Large'
  }
];
