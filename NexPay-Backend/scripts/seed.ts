import "dotenv/config";
import bcrypt from "bcrypt";
import { prisma } from "../src/config/prisma";

async function main() {
  console.log("Starting seed...");

  // WARNING: This seed script deletes some tables to ensure idempotency on dev databases.
  await prisma.$transaction(async (tx) => {
    await tx.ledger_transactions.deleteMany();
    await tx.transfers.deleteMany();
    await tx.wallet_balances.deleteMany();
    await tx.wallets.deleteMany();
    await tx.notification_preferences.deleteMany();
    await tx.notifications.deleteMany();
    await tx.users.deleteMany();
    await tx.currency_rates.deleteMany();

    const passwordHash = await bcrypt.hash("password", 10);

    // Create an admin
    const admin = await tx.users.create({
      data: {
        full_name: "Admin User",
        phone_number: "+10000000000",
        country_code: "+1",
        password_hash: passwordHash,
        role: "STAFF",
      },
    });

    const adminWallet = await tx.wallets.create({ data: { user_id: admin.id } });

    await tx.wallet_balances.createMany({
      data: [
        { wallet_id: adminWallet.id, currency: "USD", available_balance: "10000.00", pending_balance: "0" },
        { wallet_id: adminWallet.id, currency: "LBP", available_balance: "15000000.00", pending_balance: "0" },
        { wallet_id: adminWallet.id, currency: "EUR", available_balance: "5000.00", pending_balance: "0" },
      ],
    });

    await tx.notification_preferences.create({ data: { user_id: admin.id } });

    // Create sample users
    const alice = await tx.users.create({
      data: {
        full_name: "Alice Example",
        phone_number: "+11111111111",
        country_code: "+1",
        password_hash: passwordHash,
        role: "USER",
      },
    });

    const bob = await tx.users.create({
      data: {
        full_name: "Bob Example",
        phone_number: "+12222222222",
        country_code: "+1",
        password_hash: passwordHash,
        role: "USER",
      },
    });

    const aliceWallet = await tx.wallets.create({ data: { user_id: alice.id } });
    const bobWallet = await tx.wallets.create({ data: { user_id: bob.id } });

    await tx.wallet_balances.createMany({
      data: [
        { wallet_id: aliceWallet.id, currency: "USD", available_balance: "500.00", pending_balance: "0" },
        { wallet_id: aliceWallet.id, currency: "LBP", available_balance: "750000.00", pending_balance: "0" },
        { wallet_id: aliceWallet.id, currency: "EUR", available_balance: "200.00", pending_balance: "0" },

        { wallet_id: bobWallet.id, currency: "USD", available_balance: "300.00", pending_balance: "0" },
        { wallet_id: bobWallet.id, currency: "LBP", available_balance: "450000.00", pending_balance: "0" },
        { wallet_id: bobWallet.id, currency: "EUR", available_balance: "150.00", pending_balance: "0" },
      ],
    });

    await tx.notification_preferences.createMany({
      data: [{ user_id: alice.id }, { user_id: bob.id }],
    });

    // Create some currency rates
    await tx.currency_rates.createMany({
      data: [
        { base_currency: "USD", target_currency: "LBP", rate: "1500.000000", source: "seed", fetched_at: new Date(), expires_at: new Date(Date.now() + 1000 * 60 * 60) },
        { base_currency: "USD", target_currency: "EUR", rate: "0.900000", source: "seed", fetched_at: new Date(), expires_at: new Date(Date.now() + 1000 * 60 * 60) },
        { base_currency: "EUR", target_currency: "USD", rate: "1.111111", source: "seed", fetched_at: new Date(), expires_at: new Date(Date.now() + 1000 * 60 * 60) },
      ],
    });
  });

  console.log("Seeding complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
