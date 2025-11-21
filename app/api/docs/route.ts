export async function GET() {
  const docs = {
    modules: [
      {
        id: 1,
        title: "División de Datasets",
        docNumber: "07_Division_DataSet",
        description: "Técnicas esenciales para dividir datos correctamente",
        fullDescription: `
        La división correcta de datasets es el primer paso crítico en cualquier proyecto de Machine Learning. 
        Este módulo cubre las técnicas fundamentales para separar tus datos en conjuntos de entrenamiento y prueba, 
        asegurando que tu modelo sea evaluado de manera honesta y generalizable.
        
        Por qué es importante: Un modelo entrenado puede aprender perfectamente los datos pero fallar completamente 
        con datos nuevos. La división apropiada previene esta situación.
        `,
        topics: [
          {
            name: "Train-Test Split",
            description: "División simple y directa de datos en dos conjuntos principales",
            fullDescription: `
            El Train-Test Split es la técnica más básica y común. Divide los datos en dos partes:
            - Conjunto de Entrenamiento (típicamente 70-80%): Usado para entrenar el modelo
            - Conjunto de Prueba (típicamente 20-30%): Usado para evaluar el rendimiento real
            
            Es importante que esta división sea aleatoria para evitar sesgos. El random_state asegura reproducibilidad.
            Esta técnica es ideal para datasets grandes (>10,000 muestras).
            
            Ventajas:
            - Simple de implementar
            - Rápido computacionalmente
            - Intuitivo de entender
            
            Desventajas:
            - Usa solo parte de datos para entrenamiento
            - La división aleatoria puede ser sesgada en datasets pequeños
            `,
            code: "from sklearn.model_selection import train_test_split\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.3, random_state=42, stratify=y)"
          },
          {
            name: "K-Fold Cross-Validation",
            description: "Divide datos en K partes para validación más robusta y eficiente",
            fullDescription: `
            K-Fold Cross-Validation es más avanzado que Train-Test Split. Divide los datos en K partes (típicamente 5 o 10).
            En cada iteración, usa K-1 partes para entrenar y 1 para validar.
            
            Proceso:
            1. Divide datos en K partes iguales
            2. Entrena K modelos (uno por cada fold)
            3. En cada iteración, usa un fold diferente como validación
            4. Calcula el promedio de las métricas de los K modelos
            
            Ventajas:
            - Usa todos los datos para entrenamiento
            - Más robusto que Train-Test Split
            - Mejor para datasets pequeños
            - Proporciona estimación de varianza del modelo
            
            Desventajas:
            - Computacionalmente más costoso (K veces)
            - Más complejo de implementar
            `,
            code: "from sklearn.model_selection import KFold, cross_val_score\nkf = KFold(n_splits=5, shuffle=True, random_state=42)\nscores = cross_val_score(model, X, y, cv=kf, scoring='accuracy')\nprint(f'Accuracy: {scores.mean():.3f} (+/- {scores.std():.3f})')"
          },
          {
            name: "Stratified K-Fold",
            description: "K-Fold que mantiene la proporción de clases en cada fold",
            fullDescription: `
            Estratificado K-Fold es crucial cuando los datos están desbalanceados (algunas clases tienen muchos menos ejemplos).
            
            Por qué es importante: En un dataset desbalanceado (ej: 95% clase A, 5% clase B), 
            un K-Fold aleatorio podría poner todos los ejemplos de clase B en un solo fold, 
            haciendo la validación poco confiable.
            
            StratifiedKFold garantiza que:
            - Cada fold tenga aproximadamente la misma proporción de clases
            - La distribución sea representativa del dataset completo
            
            Ventajas:
            - Maneja datasets desbalanceados correctamente
            - Validación más confiable
            - Estimaciones de rendimiento más reales
            
            Casos de uso:
            - Detección de fraude
            - Diagnóstico médico
            - Cualquier problema con clases desbalanceadas
            `,
            code: "from sklearn.model_selection import StratifiedKFold, cross_val_score\nskf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)\nscores = cross_val_score(model, X, y, cv=skf, scoring='balanced_accuracy')\nprint(f'Balanced Accuracy: {scores.mean():.3f}')"
          },
          {
            name: "Time Series Split",
            description: "División temporal para datos de series de tiempo que respetan orden cronológico",
            fullDescription: `
            Para datos de series de tiempo (precios de acciones, temperatura, etc.), 
            la división aleatoria es INAPROPIADA porque viola la naturaleza temporal.
            
            TimeSeriesSplit respeta el orden temporal:
            - Fold 1: Entrena con primeros datos, valida con próximos
            - Fold 2: Entrena con primeros + segundo grupo, valida con próximo
            - Y así sucesivamente...
            
            Esto simula el escenario real: predecir el futuro basado en el pasado.
            
            Ventajas:
            - Respeta la naturaleza temporal
            - Evita información del futuro (data leakage)
            - Realista para predicción
            
            Aplicaciones:
            - Predicción de precios
            - Pronóstico de demanda
            - Análisis de tendencias
            `,
            code: "from sklearn.model_selection import TimeSeriesSplit, cross_val_score\ntscv = TimeSeriesSplit(n_splits=5)\nscores = cross_val_score(model, X, y, cv=tscv, scoring='mse')\nprint(f'Mean Squared Error: {-scores.mean():.3f}')"
          }
        ],
        chartData: [
          { name: "Entrenamiento", value: 70, fill: "#3b82f6" },
          { name: "Prueba", value: 30, fill: "#06b6d4" }
        ],
        keyPoints: [
          "Evita data leakage: información del futuro que contamina el entrenamiento",
          "Asegura evaluación honesta: el modelo se prueba con datos nunca vistos",
          "Mantén balanceo de clases: en datos desbalanceados usa StratifiedKFold",
          "Para series de tiempo: siempre usa TimeSeriesSplit, nunca división aleatoria",
          "Usa validación cruzada para datasets pequeños: proporciona mejor estimación de rendimiento"
        ]
      },
      {
        id: 2,
        title: "Preparación de Datos",
        docNumber: "08_Preparacion_DataSet",
        description: "Técnicas de transformación y escalado para optimizar modelos",
        fullDescription: `
        La preparación de datos es donde se gasta 80% del tiempo en Data Science.
        Este módulo cubre las técnicas esenciales para transformar datos crudos en formato listo para modelos.
        
        Tipos de problemas que resuelve:
        - Variables con diferentes escalas (edad 0-100 vs ingresos 0-1,000,000)
        - Variables categóricas no numéricas
        - Valores faltantes o erróneos
        - Outliers extremos
        
        Resultado: Modelos más precisos, entrenamiento más rápido, mejor generalización.
        `,
        topics: [
          {
            name: "Normalización (Min-Max)",
            description: "Escala datos a rango [0, 1] preservando la forma original",
            fullDescription: `
            Normalización Min-Max transforma cada valor usando la fórmula:
            X_norm = (X - min(X)) / (max(X) - min(X))
            
            Resultado: Todos los valores quedan entre 0 y 1.
            
            Ventajas:
            - Rango predecible [0, 1]
            - Preserva la forma de la distribución
            - Útil para redes neuronales que trabajan con [0, 1]
            
            Desventajas:
            - Sensible a outliers
            - Cambia con nuevos datos (puede salirse de [0, 1])
            
            Cuándo usar:
            - Redes neuronales
            - Cuando conoces el rango exacto de datos
            - Datos sin outliers extremos
            
            Ejemplo: Si edad va de 18 a 80:
            - 18 → 0.0
            - 49 → 0.43
            - 80 → 1.0
            `,
            code: "from sklearn.preprocessing import MinMaxScaler\nscaler = MinMaxScaler(feature_range=(0, 1))\nX_scaled = scaler.fit_transform(X_train)\nX_test_scaled = scaler.transform(X_test)  # Siempre transform, nunca fit_transform"
          },
          {
            name: "Estandarización (Z-score)",
            description: "Convierte datos a media=0 y desviación estándar=1",
            fullDescription: `
            Estandarización Z-score transforma usando:
            X_std = (X - media(X)) / desv_est(X)
            
            Resultado: Distribución normal estándar con media=0 y std=1.
            
            Ventajas:
            - Menos sensible a outliers que MinMax
            - Matemáticamente sólido
            - Funcionamiento mejor en muchos algoritmos (SVM, Regresión Logística)
            
            Desventajas:
            - No restringe a rango específico
            - Asume distribución normal
            
            Cuándo usar:
            - Modelos lineales (Regresión, SVM, Logística)
            - Cuando los outliers son legítimos pero extremos
            - La mayoría de casos
            
            Ejemplo conceptual:
            Si promedio de ingresos es 50k y std=15k:
            - 50k → 0.0 (promedio)
            - 65k → 1.0 (1 desviación estándar arriba)
            - 35k → -1.0 (1 desviación estándar abajo)
            `,
            code: "from sklearn.preprocessing import StandardScaler\nscaler = StandardScaler()\nX_scaled = scaler.fit_transform(X_train)\nX_test_scaled = scaler.transform(X_test)\nprint(f'Media: {X_scaled.mean():.6f}, Std: {X_scaled.std():.6f}')"
          },
          {
            name: "Encoding Categórico",
            description: "Convierte variables categóricas a valores numéricos",
            fullDescription: `
            Los modelos de ML solo entienden números, no texto. Encoding convierte categorías en números.
            
            Dos enfoques principales:
            
            1) Label Encoding: Asigna número a cada categoría
               Rojo → 0, Verde → 1, Azul → 2
               Problema: El modelo cree que 2 > 1 > 0 (implica orden)
               Usar solo para variables ordinales (bajo, medio, alto)
            
            2) One-Hot Encoding: Crea columna binaria por categoría
               Rojo → [1, 0, 0]
               Verde → [0, 1, 0]
               Azul → [0, 0, 1]
               Mejor para categóricas nominales
            
            Ventajas del One-Hot:
            - Sin orden implícito
            - Mejora rendimiento en árboles y NN
            
            Desventajas:
            - Aumenta dimensionalidad (maldición de dimensionalidad)
            - Requiere más memoria
            
            Estrategia:
            - Variables ordinales: LabelEncoder
            - Variables nominales con <10 categorías: OneHotEncoder
            - Variables nominales con >10 categorías: Target Encoding
            `,
            code: "# Label Encoding para ordinales\nfrom sklearn.preprocessing import LabelEncoder\nle = LabelEncoder()\nX['level'] = le.fit_transform(X['level'])  # bajo→0, medio→1, alto→2\n\n# One-Hot Encoding para nominales\nfrom sklearn.preprocessing import OneHotEncoder\nohe = OneHotEncoder(sparse_output=False)\nX_encoded = ohe.fit_transform(X[['color']])\nX_new = pd.DataFrame(X_encoded, columns=ohe.get_feature_names_out())"
          },
          {
            name: "Imputación de Valores",
            description: "Maneja valores faltantes (NaN) de manera inteligente",
            fullDescription: `
            Los valores faltantes ocurren por muchas razones:
            - Errores en recopilación
            - Datos incompletos
            - Privacidad
            - Problemas técnicos
            
            Opciones de manejo:
            
            1) Eliminar filas con NaN:
               - Simple pero puede perder información importante
               - Solo válido si NaN es <5% de datos
            
            2) Rellenar con valor constante:
               - Media: Bueno para datos normales
               - Mediana: Mejor si hay outliers
               - Moda: Para variables categóricas
               - 0: Riesgoso, puede introducir sesgo
            
            3) Métodos avanzados:
               - KNN: Usa valores de vecinos similares
               - Regresión: Predice valores faltantes
               - Forward/Backward fill: Para series de tiempo
            
            Regla: Siempre documentar qué hiciste con NaN.
            `,
            code: "from sklearn.impute import SimpleImputer\nfrom sklearn.compose import ColumnTransformer\n\n# Imputación numérica\nimputer_num = SimpleImputer(strategy='mean')\n# Imputación categórica\nimputer_cat = SimpleImputer(strategy='most_frequent')\n\n# Aplicar a columnas específicas\nfrom sklearn.compose import ColumnTransformer\nct = ColumnTransformer([\n    ('num_imp', imputer_num, numeric_cols),\n    ('cat_imp', imputer_cat, categorical_cols)\n])\nX_imputed = ct.fit_transform(X)"
          }
        ],
        chartData: [
          { name: "Original", value: 100, fill: "#ef4444" },
          { name: "Normalizado", value: 95, fill: "#f97316" },
          { name: "Estandarizado", value: 98, fill: "#3b82f6" }
        ],
        keyPoints: [
          "Mejora la convergencia: Los modelos entrenan más rápido con datos escalados",
          "Reduce impacto de outliers: Estandarización es más robusta que normalización",
          "Aumenta precisión: Escalas similares = mejor rendimiento del modelo",
          "Acelera entrenamiento: Menos iteraciones necesarias",
          "Prepara para producción: Datos consistentes desde inicio a fin",
          "Siempre: Hacer fit con TRAIN, aplicar transform a TEST"
        ]
      },
      {
        id: 3,
        title: "Transformadores y Pipelines",
        docNumber: "09_Pipelines_Personalizados",
        description: "Automatización y encadenamiento de transformaciones",
        fullDescription: `
        Los Pipelines son la clave para código profesional, reproducible y en producción.
        Encadenan múltiples transformaciones y modelos en un solo objeto reutilizable.
        
        Problemas que resuelven:
        - Data leakage: Aplicar transformaciones correctamente
        - Complejidad: Cientos de líneas reducidas a pocas
        - Reproducibilidad: Mismo resultado siempre
        - Producción: Desplegar modelos sin errores
        
        Beneficio: De exploración local a producción sin cambiar código.
        `,
        topics: [
          {
            name: "Custom Transformers",
            description: "Crea transformadores personalizados para pasos especiales",
            fullDescription: `
            A veces necesitas transformaciones que sklearn no proporciona.
            Heredando de BaseEstimator y TransformerMixin, creas transformadores reutilizables.
            
            Estructura requerida:
            - fit(X, y=None): Calcula parámetros necesarios
            - transform(X): Aplica la transformación
            - fit_transform(): Automático (hereda de TransformerMixin)
            
            Ventajas:
            - Encapsula lógica personalizada
            - Compatible con Pipeline
            - Reutilizable en múltiples proyectos
            - Testeable
            
            Ejemplos comunes:
            - Ingeniería de features (crear nuevas columnas)
            - Limpieza de datos especial
            - Transformaciones de dominio específico
            - Feature selection personalizado
            `,
            code: "from sklearn.base import BaseEstimator, TransformerMixin\nimport numpy as np\n\nclass LogTransformer(BaseEstimator, TransformerMixin):\n    def fit(self, X, y=None):\n        return self\n    \n    def transform(self, X):\n        # Aplica log solo a valores positivos\n        return np.log1p(X)  # log1p = log(1 + X), evita log(0)\n\n# Usar en pipeline\npipe = Pipeline([\n    ('log_trans', LogTransformer()),\n    ('scaler', StandardScaler()),\n    ('model', LogisticRegression())\n])"
          },
          {
            name: "Pipeline Básico",
            description: "Encadena múltiples transformadores en secuencia",
            fullDescription: `
            Pipeline encadena transformadores y termina con un estimador (modelo).
            
            Beneficios principales:
            
            1) Data Leakage Prevention:
               - Sin Pipeline: Calculas media en TODO el dataset, peligro
               - Con Pipeline: Calcula media en TRAIN, aplica a TEST
            
            2) Código limpio:
               - Sin Pipeline: 20 líneas de fit_transform
               - Con Pipeline: 1 línea pipe.fit(X_train, y_train)
            
            3) Reproducibilidad:
               - Mismo código = mismo resultado
               - Fácil de versionar
            
            4) Transición a producción:
               - Guardar un archivo
               - Cargar y predecir
               - Sin reescribir lógica
            
            Estructura:
            pipe = Pipeline([
                ('name1', Transformer1()),
                ('name2', Transformer2()),
                ...
                ('model', Model())
            ])
            
            Orden importa: Transformaciones antes del modelo.
            `,
            code: "from sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.decomposition import PCA\nfrom sklearn.ensemble import RandomForestClassifier\n\npipe = Pipeline([\n    ('scaler', StandardScaler()),\n    ('pca', PCA(n_components=10)),\n    ('rf', RandomForestClassifier(n_estimators=100, random_state=42))\n])\n\npipe.fit(X_train, y_train)\naccuracy = pipe.score(X_test, y_test)\nprint(f'Accuracy: {accuracy:.3f}')"
          },
          {
            name: "ColumnTransformer",
            description: "Aplica transformaciones diferentes a grupos de columnas",
            fullDescription: `
            ColumnTransformer es poder: Trata diferentes tipos de columnas diferente.
            
            Escenario común:
            - Columnas numéricas: Necesitan StandardScaler
            - Columnas categóricas: Necesitan OneHotEncoder
            
            Sin ColumnTransformer: Cambios manuales, propenso a errores
            Con ColumnTransformer: Automático y consistente
            
            Proceso:
            1. Define transformaciones por tipo
            2. Especifica qué columnas van a cada transformación
            3. ColumnTransformer aplica a cada grupo
            4. Combina resultados automáticamente
            
            Ventajas:
            - Manejo automático de tipos diferentes
            - Código más limpio y legible
            - Menos propenso a errores
            - Fácil de modificar
            
            Ejemplo real:
            Tienes dataset con edad, ingresos, país, género
            - Edad, ingresos: Numéricos → StandardScaler
            - País, género: Categóricos → OneHotEncoder
            ColumnTransformer lo hace automáticamente.
            `,
            code: "from sklearn.compose import ColumnTransformer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\n\nnumeric_cols = ['age', 'income', 'years']\ncategorical_cols = ['country', 'gender']\n\nct = ColumnTransformer([\n    ('num', StandardScaler(), numeric_cols),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_cols)\n])\n\npipe = Pipeline([\n    ('preprocessor', ct),\n    ('classifier', LogisticRegression(max_iter=1000))\n])\n\npipe.fit(X_train, y_train)\nscore = pipe.score(X_test, y_test)"
          },
          {
            name: "GridSearchCV en Pipeline",
            description: "Busca hiperparámetros óptimos en todo el pipeline automáticamente",
            fullDescription: `
            GridSearchCV prueba múltiples combinaciones de hiperparámetros automáticamente.
            
            Hiperparámetros: Parámetros que configuras ANTES del entrenamiento
            - Número de capas en red neuronal
            - C en SVM
            - n_components en PCA
            - max_depth en árbol
            
            Sin GridSearchCV: Pruebas manuales, tedioso y fácil de cometer errores
            Con GridSearchCV: Prueba todas las combinaciones, elige la mejor
            
            Beneficios:
            - Automatiza búsqueda
            - Usa validación cruzada (más robusto)
            - Previene overfitting
            - Reporta resultados detallados
            
            Proceso:
            1. Define param_grid con opciones
            2. GridSearchCV prueba todas las combinaciones
            3. Usa cross-validation para cada combo
            4. Elige la que mejor promedia
            5. Reentrana con todos los datos
            
            Costo computacional:
            Si pruebas 3 opciones × 4 opciones × 5 folds = 60 entrenamientos
            Considera usar RandomizedSearchCV para muchas opciones.
            `,
            code: "from sklearn.model_selection import GridSearchCV\n\npipe = Pipeline([\n    ('scaler', StandardScaler()),\n    ('pca', PCA()),\n    ('clf', RandomForestClassifier(random_state=42))\n])\n\nparam_grid = {\n    'pca__n_components': [5, 10, 15, 20],\n    'clf__n_estimators': [50, 100, 200],\n    'clf__max_depth': [10, 20, None]\n}\n\ngrid = GridSearchCV(pipe, param_grid, cv=5, scoring='accuracy', n_jobs=-1)\ngrid.fit(X_train, y_train)\n\nprint(f'Best params: {grid.best_params_}')\nprint(f'Best CV score: {grid.best_score_:.3f}')\nprint(f'Test score: {grid.score(X_test, y_test):.3f}')"
          }
        ],
        chartData: [
          { stage: "Input", accuracy: 65 },
          { stage: "Scaler", accuracy: 78 },
          { stage: "PCA", accuracy: 82 },
          { stage: "RF", accuracy: 89 }
        ],
        keyPoints: [
          "Pipelines previenen data leakage: Separación clara entre fit y transform",
          "Automatiza flujos: De 50 líneas a 5 líneas de código limpio",
          "Reproducibilidad garantizada: Mismo código = mismo resultado siempre",
          "Facilita producción: Guardar pipeline = guardar modelo + transformaciones",
          "GridSearchCV optimiza: Encuentra hiperparámetros óptimos automáticamente",
          "ColumnTransformer simplifica: Manejo automático de tipos diferentes"
        ]
      }
    ]
  };

  return Response.json(docs);
}
