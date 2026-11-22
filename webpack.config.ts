import type { Configuration } from "webpack"
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export default function Config(
    _env : unknown,
    argv : { mode? : Configuration["mode"] }
) {
    const isProduction = argv.mode === "production";

    return {
        mode : isProduction ? "production" : "development",
        entry : "./app.ts",
        output : {
            filename : "app.js"
        },
        experiments : {
            typescript : true,
        },
        resolve : {
            extensions : [".ts","..."]
        },
        module : {
            rules: [
                {
                    test: /\.css$/i,
                    use: [MiniCssExtractPlugin.loader, "css-loader"],
                },
                {
                    test: /\.(ttf|woff2?)$/i,
                    type: "asset/resource",
                    generator: { filename: "fonts/[name][ext]" },
                },
                {
                    test: /\.(png|jpe?g|webp|svg)$/i,
                    type: "asset/resource",
                    generator: { filename: "images/[name][ext]" },
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({ template: "./html/index.html" }),
            new MiniCssExtractPlugin({ filename: "main.css" }),
        ],
    }
}