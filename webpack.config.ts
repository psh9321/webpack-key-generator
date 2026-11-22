import type { Configuration } from "webpack"
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export default function Config(
    _env : unknown,
    argv : { mode? : Configuration["mode"] }
) {
    const isProduction = argv.mode === "production";

    return {
        mode : isProduction ? "production" : "development",
        devtool : isProduction ? false : "source-map",
        entry : "./app.ts",
        output : {
            filename : "app.js"
        },
        optimization : {
            minimize : isProduction,
            minimizer : ["...", new CssMinimizerPlugin()],
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
            new HtmlWebpackPlugin({ 
                template: "./html/index.html",
                favicon : "./img/favicon.svg",
                minify : isProduction,
            }),
            new MiniCssExtractPlugin({ filename: "main.css" }),
        ],
    } satisfies Configuration
}
