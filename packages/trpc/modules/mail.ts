import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

const keys = {
  type: "service_account",
  project_id: "mail-service-397405",
  private_key_id: "25c1976d63b47c53aa44e6075dfdb45b16854352",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEuwIBADANBgkqhkiG9w0BAQEFAASCBKUwggShAgEAAoIBAQDJZQkwUNXMHkET\nQEENLwHxBGIKylDDgiJS/Gc6gXH9MtEYMsQnVW7Jd1Spui6J5mbGSWnwdnQBKKOH\n0qrJ6oyMt6ChuCTqARMcy2PeP4fTIgBwMUqm2SwKy5zBuSsNW7/BGrZH94lUX271\n4dglABrvKs9eHHo/gzFlRZFRzMJHB/9EOAziV8PdPCyDQwtwEJ1TEthwkxcTclfr\nl1G01Z01x0AbPnLpacO6DwHJeTZg0V/naG1We1hBv3MQRgd/uIvJjzDFTV7vgRUe\noBHXcq1qLPX5pTrNSKRGixi9NeMKXDRWEYc4I7vKKbPQzkm/NdJcwX7VWi5YZBTA\nroy4StI1AgMBAAECgf9u3BqjaYn03J4Uf+PKDCCAWG5sd+eW6qUthBURcXeqB8nz\nF2+GYFfZMplyWaP86LiLjL803Dz/Hp0jjW1C6/hySjwXvyciI55C/gSpe4Jx31og\n92ebZmtdH4S6AArwT4a5XyPZMg166XP35cB7vFWmmXmMxT8A1eT0iFbw9/ja4nHE\ngphBf4Id6tYx3T2h8V0SBRTnAxoZxJenSdG8bT7JEQPbpYt0HONkPNWXPJGfDBc0\npFL4PhTS8IW6rAZ8q7mb6LvPBdoGPin+uJTiPXSzYbxNVKr6iowEx/n7C8PQv5Hg\nODsmOXHsnmlyZu2Gju/wIMtWk5nkGjKJ8IokxwECgYEA/kaHY16oKz/01HwC0VwV\n1oiLdCzEzS66+4Sxim9nChFb0jDIrExrdDI/uPOUrVawxGyNXjNks0YRPShd86zn\nXjoms3Ogiz4qHyKma5w1dZl50DdIf5+4V0eMUtcHSo5Ync7qnx8au5kmucmEcVq1\nHDgnvmiP2odMHkt795HS2vUCgYEAysKyHHXIleYK+HzbqoiQi/sZdqUnAVBaG4uq\nNLvK92X6lEZqN5I0/PA4F/PrgwxsaXZ5FqxXXoW066mR6AIXyW177DXZxRLnJmIi\nKp517xy2R2Vyuw1IpHxBanudJVf7/CSQcMPX46eO5pSGRq9DoYyJ42bifWdlQ2iF\n3CNsEkECgYBkL6ncj0k3cUWoCwyZLO010CsSJSmNpqHpxAioAOjaYKiLEsmeiaW0\n7K+K0f58pbGUUykIOrusnyjfre4GutOWntbs0dwpwN6b0e08bRnrMgN69K1OC8J4\nMSqq4SpwR9HGq+Zpt7myvM8zWKEkgJbnfYC7VzuG4NQvA5LeosgvmQKBgQCoGBkJ\nNyx/+SMHNpv2GRmcsyM9FVXs5OyPAY6uATIXQFgpLOdKAtAjEhOu5+1Ly7TlCe8B\nOQeFuVtwNDheG74Uo8uk3FAZ7b3sOFcS9iPXg/op3pTrNewPUWP6H1j8aKDjPHzy\nv6nvdi4mQuO/HfX3rEd0WwtR47Iz3Cd9hXBHAQKBgHF3Q+eYMoHjA0dljEmiW8GP\ngCq1oaWoS7bBOhUlZFvBc1G0JDq4R+hUDsqDicxb+n8FTyI9tqcUy40EukQaF31N\nav7deC00f2iNYboSbNN0/3MYAEKA7ZBXipUNwQj3S4j3+e96tTxXsrWoR785WC7e\nFmGK5q6s7yYuebsT9AOE\n-----END PRIVATE KEY-----\n",
  client_email: "mail-service@mail-service-397405.iam.gserviceaccount.com",
  client_id: "105856040790202527088",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/mail-service%40mail-service-397405.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

export const mail = async (
  options: Mail.Options & {
    text: string;
  }
): Promise<boolean> => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    tls: {
      rejectUnauthorized: false,
    },
    auth: {
      type: "OAuth2",
      user: "support@cheaphotelshub.com",
      serviceClient: keys.client_id,
      privateKey: keys.private_key,
      accessUrl: keys.token_uri,
    },
  });

  try {
    const verify = await transporter.verify();

    if (!verify) return false;

    const information = await transporter.sendMail({
      ...options,
      from: "noreply@cheaphotelshub.com",
    });

    return information.accepted.length > 0;
  } catch (error) {
    console.log("MAIL ERROR", error);
  }

  return false;
};
