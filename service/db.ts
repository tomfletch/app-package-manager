import { AppPackage } from '../models/appPackage';

const appPackages: AppPackage[] = [
  {
    name: 'News',
    packageName: 'com.app.package.news',
    version: 'v3.2.5',
    status: 'Submitted',
    description: '### Changelog\n- Fix issue with card width\n- Now includes sport category in the main feed\n- New App Icon design\n- Category select screen added',
    createdAt: '2023-05-10T00:00:00',
    notes: [
      {
        id: '85bb6380-34e4-4b64-b42f-b201be72741f',
        email: 'joe.bloggs@gmail.com',
        name: 'Joe Bloggs',
        createdAt: '2023-05-12T14:00:00',
        body: 'Client seems happy with the updated build, ready to submit to the Play Store!'
      },
      {
        id: 'e42e6001-1ca8-4c01-9a2f-0deab03881f6',
        email: 'kate.jones@gmail.com',
        name: 'Kate Jones',
        createdAt: '2023-05-12T11:00:00',
        body: 'Joe - can you check if the client is happy with the latest build?'
      }
    ],
  },
  {
    name: 'News',
    packageName: 'com.app.package.news',
    version: 'v3.2.4',
    status: 'Released',
    description: '### Changelog\n- Added the business category\n- Fixed sign in bug',
    createdAt: '2023-05-05T00:00:00',
    notes: [],
  },
  {
    name: 'Ribbon',
    packageName: 'com.app.package.ribbon',
    version: 'v5.0.5',
    status: 'Released',
    description: '### Changelog\n- Fixed security vulnerability',
    createdAt: '2023-05-01T00:00:00',
    notes: [],
  },
  {
    name: 'Headlines',
    packageName: 'com.app.package.headlines',
    version: 'v5.0.5',
    status: 'Draft',
    description: '### Changelog\n- Created a trending section\n- Included personalised content',
    createdAt: '2023-05-01T00:00:00',
    notes: [],
  }
];

export function getAllAppPackages(): AppPackage[] {
  return appPackages;
}

export function getAppPackage(packageName: string, version: string): AppPackage | null {
  const appPackage = appPackages.find((p) => p.packageName === packageName && p.version === version);
  return appPackage || null;
}

export function getRelatedAppPackages(packageName: string): AppPackage[] {
  return appPackages.filter((p) => p.packageName === packageName);
}
