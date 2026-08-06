const { Verifier } = require('@pact-foundation/pact');
const path = require('path');
const controller = require('./product.controller');
const Product = require('./product');
const { createApp } = require('../server');

// Setup provider server to verify
const server = createApp().listen("8083");

describe("Pact Verification", () => {
    it("validates the expectations of eShopProductService", () => {
        const opts = {
            logLevel: "INFO",
            providerBaseUrl: "http://127.0.0.1:8083",
            provider: "eShopProductService",
            providerVersion: process.env.GIT_COMMIT || "local",
            providerVersionBranch: process.env.GIT_BRANCH || "local",
            stateHandlers: {
                "product with ID 10 exists": () => {
                    controller.repository.products = new Map([
                        ["10", new Product("10", "CREDIT_CARD", "28 Degrees", "v1")]
                    ]);
                },
                "products exist": () => {
                    controller.repository.products = new Map([
                        ["09", new Product("09", "CREDIT_CARD", "Gem Visa", "v1")],
                        ["10", new Product("10", "CREDIT_CARD", "28 Degrees", "v1")]
                    ]);
                },
                "no products exist": () => {
                    controller.repository.products = new Map();
                },
                "product with ID 99 does not exist": () => {
                    controller.repository.products = new Map();
                },
                "a product can be created": () => {
                    controller.repository.products = new Map();
                },
                "product validation is enabled": () => {
                    controller.repository.products = new Map();
                },
            },
            requestFilter: (req, res, next) => {
                if (!req.headers["authorization"]) {
                    next();
                    return;
                }
                req.headers["authorization"] = `Bearer ${new Date().toISOString()}`;
                next();
            },
        };

        if (process.env.PACT_BROKER_URL) {
            const brokerOpts = {
                pactBrokerUrl: process.env.PACT_BROKER_URL,
                consumerVersionSelectors: [{ latest: true }],
                publishVerificationResult: process.env.PACT_PUBLISH_RESULTS === "true",
            };
            if (process.env.PACT_BROKER_TOKEN) {
                brokerOpts.pactBrokerToken = process.env.PACT_BROKER_TOKEN;
            } else if (process.env.PACT_BROKER_USERNAME) {
                brokerOpts.pactBrokerUsername = process.env.PACT_BROKER_USERNAME;
                brokerOpts.pactBrokerPassword = process.env.PACT_BROKER_PASSWORD;
            }
            Object.assign(opts, brokerOpts);
        } else {
            opts.pactUrls = [
                path.resolve(
                    process.env.PACT_FILE ||
                    "../consumer/pacts/eShopConsumer-eShopProductService.json"
                ),
            ];
        }

        return new Verifier(opts).verifyProvider().then(output => {
            console.log(output);
        }).finally(() => {
            server.close();
        });
    })
});
