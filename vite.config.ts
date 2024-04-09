import path from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		dts({
			include: ['src'],
		}),
	],
	build: {
		lib: {
			// fileName: 'main',
			entry: path.resolve(__dirname, 'src', 'main.ts'),
			name: "react-extended-jsx",
			// formats: ['umd'],
		},
		rollupOptions: {
			external: ['react', 'react/jsx-runtime'],
			output: {
				dir: 'dist', // Especifica el directorio de salida
				entryFileNames: `[name].[format].js`, // Personaliza los nombres de archivo de salida
				sourcemap: true,
				// Configuraciones específicas para cada formato
				format: ['es', 'cjs'].map((format) => ({
				format: format,
				exports: 'named', // 'named' para múltiples exportaciones o 'default' para una única exportación
				sourcemap: true,
				preserveModules: true, // Preserva la estructura de directorios de módulos
				})),
				globals: {
					react: 'react',
					'react/jsx-runtime':'react/jsx-runtime'
				}
			}
				
			
			},
	},
	})
