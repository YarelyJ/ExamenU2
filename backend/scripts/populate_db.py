import django
import os
import sys

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from api.models import Module

modules_data = [
    {
        "name": "division",
        "title": "División de Datasets",
        "description": "Aprende las técnicas fundamentales para dividir tus datos en conjuntos de entrenamiento y prueba.",
        "topics": [
            {
                "title": "Train-Test Split",
                "description": "Divide aleatoriamente los datos en 70% entrenamiento y 30% prueba.",
                "subtopics": [
                    "Previene overfitting",
                    "Validación realista del modelo",
                    "Reproducibilidad con random_state"
                ]
            },
            {
                "title": "K-Fold Cross-Validation",
                "description": "Divide datos en k partes iguales para validación múltiple.",
                "subtopics": [
                    "Mejor uso de datos limitados",
                    "Reduces varianza en evaluación",
                    "Típicamente k=5 o k=10"
                ]
            },
            {
                "title": "Stratified Split",
                "description": "Mantiene proporciones de clases en entrenamiento y prueba.",
                "subtopics": [
                    "Esencial para datos desbalanceados",
                    "Preserva distribución de clases",
                    "Evita muestras sesgadas"
                ]
            }
        ],
        "examples": [
            {
                "title": "Train-Test Split con scikit-learn",
                "code": "from sklearn.model_selection import train_test_split\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)",
                "language": "python"
            },
            {
                "title": "K-Fold Cross-Validation",
                "code": "from sklearn.model_selection import KFold\nkf = KFold(n_splits=5, shuffle=True, random_state=42)\nfor train_idx, test_idx in kf.split(X):\n    X_train, X_test = X[train_idx], X[test_idx]",
                "language": "python"
            }
        ],
        "key_points": [
            "Previene overfitting",
            "Valida generalización",
            "Crucial para modelos confiables"
        ]
    },
    {
        "name": "preparation",
        "title": "Preparación de Datos",
        "description": "Técnicas esenciales para limpiar y transformar datos antes de entrenar modelos.",
        "topics": [
            {
                "title": "Normalización",
                "description": "Escala características a rango [0, 1].",
                "subtopics": [
                    "Min-Max Scaling",
                    "Mantiene relaciones lineales",
                    "Mejor para redes neuronales"
                ]
            },
            {
                "title": "Estandarización",
                "description": "Transforma datos a media 0 y varianza 1.",
                "subtopics": [
                    "Z-score normalization",
                    "Ideal para algoritmos basados en distancia",
                    "Mejor para regresión lineal"
                ]
            },
            {
                "title": "Manejo de Valores Faltantes",
                "description": "Estrategias para tratar datos incompletos.",
                "subtopics": [
                    "Eliminación de filas",
                    "Media/Mediana imputation",
                    "Métodos avanzados (KNN, Iterative)"
                ]
            },
            {
                "title": "Encoding Categórico",
                "description": "Convierte variables categóricas en numéricas.",
                "subtopics": [
                    "One-Hot Encoding",
                    "Label Encoding",
                    "Target Encoding"
                ]
            }
        ],
        "examples": [
            {
                "title": "Normalización Min-Max",
                "code": "from sklearn.preprocessing import MinMaxScaler\nscaler = MinMaxScaler()\nX_normalized = scaler.fit_transform(X)",
                "language": "python"
            },
            {
                "title": "Estandarización Z-score",
                "code": "from sklearn.preprocessing import StandardScaler\nscaler = StandardScaler()\nX_standardized = scaler.fit_transform(X)",
                "language": "python"
            }
        ],
        "key_points": [
            "Mejora significativamente resultados",
            "Acelera convergencia del modelo",
            "Evita sesgo de escala"
        ]
    },
    {
        "name": "pipelines",
        "title": "Transformadores y Pipelines",
        "description": "Crea flujos de trabajo automáticos y reproducibles para preprocesamiento y modelado.",
        "topics": [
            {
                "title": "Pipelines Básicos",
                "description": "Encadena múltiples transformaciones en un flujo.",
                "subtopics": [
                    "Previene data leakage",
                    "Código más limpio y mantenible",
                    "Facilita reproducibilidad"
                ]
            },
            {
                "title": "Transformadores Personalizados",
                "description": "Crea transformadores propios que se integren con scikit-learn.",
                "subtopics": [
                    "Hereda de BaseEstimator y TransformerMixin",
                    "Implementa fit() y transform()",
                    "Reutilizable en cualquier pipeline"
                ]
            },
            {
                "title": "ColumnTransformer",
                "description": "Aplica transformaciones diferentes a diferentes columnas.",
                "subtopics": [
                    "Procesa variables numéricas y categóricas",
                    "Mantiene estructura de datos",
                    "Muy flexible y poderoso"
                ]
            },
            {
                "title": "GridSearchCV en Pipelines",
                "description": "Optimiza hiperparámetros del pipeline completo.",
                "subtopics": [
                    "Busca mejores configuraciones",
                    "Evaluación cruzada integrada",
                    "Evita overfitting en tuning"
                ]
            }
        ],
        "examples": [
            {
                "title": "Pipeline Simple",
                "code": "from sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\n\npipeline = Pipeline([\n    ('scaler', StandardScaler()),\n    ('classifier', LogisticRegression())\n])\n\npipeline.fit(X_train, y_train)",
                "language": "python"
            },
            {
                "title": "Transformador Personalizado",
                "code": "from sklearn.base import BaseEstimator, TransformerMixin\n\nclass CustomTransformer(BaseEstimator, TransformerMixin):\n    def fit(self, X, y=None):\n        return self\n    def transform(self, X):\n        # Tu lógica personalizada\n        return X",
                "language": "python"
            }
        ],
        "key_points": [
            "Garantiza consistencia train-test",
            "Previene data leakage",
            "Código profesional y reproducible"
        ]
    }
]

for module_data in modules_data:
    Module.objects.update_or_create(
        name=module_data["name"],
        defaults=module_data
    )
    print(f"Created/Updated module: {module_data['title']}")
