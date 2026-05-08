#!/usr/bin/env python3
"""Generate Faire un Pont® presentation PDF."""

from reportlab.lib.pagesizes import landscape, A4
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, white
from reportlab.lib.units import cm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER
import textwrap

# ── Colours ────────────────────────────────────────────────────────────────
NIGHT     = HexColor("#0d1b2a")
NAVY      = HexColor("#112240")
GOLD      = HexColor("#c9933a")
GOLD_LIGHT= HexColor("#e6b96a")
CREAM     = HexColor("#f4f0e8")
MUTED     = HexColor("#8a9bbf")
LIGHT_TXT = HexColor("#cdd6e8")
GOLD_BORDER = HexColor("#c9933a")

# ── Page setup (16:9) ──────────────────────────────────────────────────────
W, H = 960, 540  # points ~ 16:9

# ── Slide data ─────────────────────────────────────────────────────────────
slides = [
    {
        "id": 0, "type": "cover",
        "title": "Pourquoi faire un Pont® ?",
        "subtitle": "Coaching de dirigeants · Une approche intégrative & augmentée par l'IA",
    },
    {
        "id": 1, "type": "bullets",
        "section": "Domaines d'intervention",
        "title": "Dans quelles situations FuP intervient",
        "items": [
            "Coaching pour accompagner une prise de poste",
            "Coaching pour accompagner la résolution d'un problème chronique",
            "Coaching pour faire un point sur son parcours professionnel et sur les facteurs de motivation",
            "Mal-être du dirigeant",
            "Support du dirigeant dans une période de tension",
        ],
    },
    {
        "id": 2, "type": "bullets",
        "section": "Philosophie",
        "title": "Ce que le coaching est, et ce qu'il n'est pas…",
        "items": [
            "Le coaching n'est pas du conseil — c'est une démarche qui aide le coaché à exprimer ses propres solutions au problème exprimé.",
            "Toute séance démarre avec l'expression du problème du coaché. Le problème exprimé n'est souvent pas le véritable problème.",
            "La connaissance de l'environnement est un plus, mais elle devient un obstacle si elle ferme l'échange autour des présupposés du coach.",
        ],
    },
    {
        "id": 3, "type": "grid",
        "section": "Approche intégrative",
        "title": "Une multitude d'approches",
        "subtitle": "11 courants · 11 outils clés · 4 finalités stratégiques · 1 impact business",
        "items": [
            {"num": "01", "name": "Humaniste",             "detail": "Carl Rogers, A. Maslow"},
            {"num": "02", "name": "TCC",                   "detail": "Aaron Beck, A. Ellis"},
            {"num": "03", "name": "Systémique",            "detail": "Gregory Bateson"},
            {"num": "04", "name": "Psychodynamique",       "detail": "Freud, Carl Jung"},
            {"num": "05", "name": "Existentiel",           "detail": "Frankl, Irvin Yalom"},
            {"num": "06", "name": "Psychologie Positive",  "detail": "Martin Seligman"},
            {"num": "07", "name": "Neurosciences",         "detail": "Recherches contemporaines"},
            {"num": "08", "name": "Analyse Transactionnelle", "detail": "Eric Berne"},
            {"num": "09", "name": "PNL",                   "detail": "Bandler, Grinder"},
            {"num": "10", "name": "Management & Stratégie","detail": "Sciences de gestion"},
            {"num": "11", "name": "IA & Data",             "detail": "IA générative & Data science"},
        ],
    },
    {
        "id": 4, "type": "finalites",
        "section": "Stratégie",
        "title": "Les 4 finalités stratégiques du coaching",
        "items": [
            {"num": "1", "title": "Sécuriser",   "sub": "le dirigeant",       "result": "Éviter les décisions destructrices de valeur"},
            {"num": "2", "title": "Comprendre",  "sub": "la situation réelle", "result": "Décisions plus lucides, moins politiques"},
            {"num": "3", "title": "Redonner",    "sub": "une direction",       "result": "Réalignement stratégique profond"},
            {"num": "4", "title": "Accélérer",   "sub": "la performance",      "result": "Exécution, traction, résultats mesurables"},
        ],
    },
    {
        "id": 5, "type": "bullets",
        "section": "Inspiration",
        "title": "Les courants qui m'inspirent",
        "items": [
            "Tous les courants sont inspirants et pratiqués",
            "Approches existentielles — questionner le sens donné aux actions menées",
            "Thérapies comportementales et cognitives — corriger les schémas de pensées destructeurs de valeur",
            "Approches systémiques — décortiquer le fonctionnement des organisations",
            "Approches narratives — raconter une autre histoire que celle dans laquelle on est enfermé",
        ],
    },
    {
        "id": 6, "type": "bullets",
        "section": "Parcours",
        "title": "Pourquoi j'ai choisi ce métier ?",
        "items": [
            "Un métier de sagesse et de maturité",
            "Exercé en présentiel ou en visio — les déplacements fréquents ne sont pas un obstacle",
            "Soutenir et aider le coaché à s'accomplir est un facteur d'accomplissement et de plaisir",
            "Exercer à la fois thérapeute (personnes physiques) et coach (entreprises et dirigeants)",
            "Une compréhension fine des enjeux stratégiques et financiers",
            "Expérience de co-direction d'une entreprise de 100 personnes",
        ],
    },
    {
        "id": 7, "type": "tricolumn",
        "section": "Approche holistique",
        "title": "Une séance de soutien émotionnel",
        "subtitle": "Corps · Coeur · Esprit",
        "items": [
            {"icon": "Corps",   "title": "Le Corps",   "bullets": ["Yoga sur chaise", "Cohérence cardiaque (Respirelax)"]},
            {"icon": "Coeur",   "title": "Le Coeur",   "bullets": ["Certifié programme EmotionAid", "Développé par les équipes israéliennes en matière de post-trauma"]},
            {"icon": "Esprit",  "title": "L'Esprit",   "bullets": ["Échange libre sur les points préoccupants", "Possible une fois le trouble dissipé et la respiration revenue"]},
        ],
    },
    {
        "id": 8, "type": "timeline",
        "section": "Gestion de crise",
        "title": "Le coaching de crise",
        "items": [
            {"step": "1", "title": "Soutien émotionnel initial",  "desc": "Démarre quasi systématiquement par une séance de soutien émotionnel."},
            {"step": "2", "title": "Structuration progressive",    "desc": "La part de soutien diminue au profit de la structuration de l'action face aux événements stressants."},
            {"step": "3", "title": "Maturité atteinte",            "desc": "On commence à planifier les actions à mener sur les mois à venir."},
            {"step": "4", "title": "Achèvement",                   "desc": "Le travail s'achève sur le ressenti autour des différents scénarios de sortie de crise."},
        ],
    },
    {
        "id": 9, "type": "grid",
        "section": "Vision globale",
        "title": "Le tableau de bord du dirigeant",
        "subtitle": "Un coach de crise est attentif à tous les aspects de la vie du dirigeant",
        "items": [
            {"num": "1", "name": "Entourage",         "detail": "Famille, amis, relations au sein de l'entreprise"},
            {"num": "2", "name": "Santé",             "detail": "Bilan de santé, addictions, troubles cognitifs, qualité du sommeil"},
            {"num": "3", "name": "Activité physique", "detail": "Indispensable pour soutenir la tension et préserver la clarté des décisions"},
            {"num": "4", "name": "Niveau de partage", "detail": "Seul, avec un codir, avec un comité dédié"},
        ],
    },
    {
        "id": 10, "type": "team",
        "section": "L'équipe",
        "title": "L'équipe Faire un Pont",
        "subtitle": "4 coachs HEC spécialisés",
        "items": [
            {"initials": "SG", "name": "Sandrine Gruda",   "role": "Coach de performance"},
            {"initials": "LC", "name": "Laurent Courbon",  "role": "Coach de santé"},
            {"initials": "HC", "name": "Hervé Charlannes", "role": "Coach et IA"},
            {"initials": "SL", "name": "Sandrine Lagarde", "role": "Psychologue clinicienne et psychanalyste"},
        ],
    },
    {
        "id": 11, "type": "closing",
        "section": "Notre fondation",
        "title": "La JOIE",
        "quote": "Le passage d'un être à une plus grande perfection.",
        "author": "Spinoza",
        "items": [
            "Augmentation de notre puissance d'agir — capacité à exister et à produire des effets.",
            "Un affect fondamental inscrit dans la dynamique même de la vie.",
            "Naît lorsque quelque chose favorise notre essence, en accord avec notre nature propre.",
            "S'oppose à la tristesse, diminution de cette puissance d'agir.",
            "Comprendre les causes de ce qui nous affecte augmente notre puissance et notre joie.",
        ],
    },
]

# ── Drawing helpers ────────────────────────────────────────────────────────

def set_bg(c, color=NIGHT):
    c.setFillColor(color)
    c.rect(0, 0, W, H, fill=1, stroke=0)


def gradient_bg(c):
    """Simulate gradient with two overlapping rects."""
    c.setFillColor(NIGHT)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    c.setFillColor(HexColor("#1a3058"))
    c.setFillAlpha(0.55)
    c.rect(W * 0.4, 0, W * 0.6, H, fill=1, stroke=0)
    c.setFillAlpha(1)


def section_label(c, label, x, y):
    c.setFont("Helvetica", 8)
    c.setFillColor(GOLD)
    c.drawString(x, y, label.upper())


def wrap_text(text, max_chars):
    return textwrap.wrap(text, max_chars)


def draw_text_block(c, text, x, y, font, size, color, max_chars=None, line_height=None):
    """Draw possibly-wrapped text, return new y."""
    if line_height is None:
        line_height = size * 1.4
    c.setFont(font, size)
    c.setFillColor(color)
    if max_chars:
        lines = wrap_text(text, max_chars)
    else:
        lines = [text]
    for line in lines:
        c.drawString(x, y, line)
        y -= line_height
    return y


def rounded_rect(c, x, y, w, h, r=8, fill_color=NAVY, stroke_color=None, alpha=1.0):
    c.setFillColor(fill_color)
    c.setFillAlpha(alpha)
    if stroke_color:
        c.setStrokeColor(stroke_color)
        c.setLineWidth(0.5)
        c.roundRect(x, y, w, h, r, fill=1, stroke=1)
    else:
        c.setStrokeAlpha(0)
        c.roundRect(x, y, w, h, r, fill=1, stroke=0)
    c.setFillAlpha(1)
    c.setStrokeAlpha(1)


def gold_dot(c, x, y, r=3):
    c.setFillColor(GOLD)
    c.circle(x, y, r, fill=1, stroke=0)


def divider_line(c, x, y, length):
    c.setStrokeColor(MUTED)
    c.setStrokeAlpha(0.2)
    c.setLineWidth(0.5)
    c.line(x, y, x + length, y)
    c.setStrokeAlpha(1)


# ── Slide renderers ────────────────────────────────────────────────────────

def draw_cover(c, slide):
    gradient_bg(c)
    # Decorative circles
    cx, cy = W / 2, H / 2
    for r in [360, 280]:
        c.setStrokeColor(GOLD)
        c.setStrokeAlpha(0.06)
        c.setLineWidth(0.8)
        c.circle(cx, cy, r, fill=0, stroke=1)
    c.setStrokeAlpha(1)
    # Glow bottom-right
    c.setFillColor(GOLD)
    c.setFillAlpha(0.07)
    c.circle(W - 80, 80, 200, fill=1, stroke=0)
    c.setFillAlpha(1)

    # Brand label
    c.setFont("Helvetica", 8)
    c.setFillColor(GOLD)
    c.drawCentredString(cx, cy + 170, "FAIRE UN PONT®")

    # Main title
    c.setFont("Helvetica-Bold", 48)
    c.setFillColor(CREAM)
    c.drawCentredString(cx, cy + 80, "Pourquoi faire")

    c.setFont("Helvetica-BoldOblique", 48)
    c.setFillColor(GOLD_LIGHT)
    c.drawCentredString(cx, cy + 20, "un Pont® ?")

    # Subtitle
    c.setFont("Helvetica", 13)
    c.setFillColor(MUTED)
    c.drawCentredString(cx, cy - 40, slide["subtitle"])


def draw_bullets(c, slide):
    set_bg(c)
    x = 70
    y = H - 60

    section_label(c, slide["section"], x, y)
    y -= 30

    # Title (possibly two lines)
    c.setFont("Helvetica-Bold", 28)
    c.setFillColor(CREAM)
    title_lines = wrap_text(slide["title"], 55)
    for line in title_lines:
        c.drawString(x, y, line)
        y -= 36
    y -= 10

    # Items
    for item in slide["items"]:
        gold_dot(c, x + 5, y + 4)
        lines = wrap_text(item, 80)
        for i, line in enumerate(lines):
            c.setFont("Helvetica", 13)
            c.setFillColor(LIGHT_TXT)
            c.drawString(x + 18, y, line)
            y -= 20
        y -= 8


def draw_grid(c, slide):
    set_bg(c)
    x = 70
    y = H - 60

    section_label(c, slide["section"], x, y)
    y -= 28

    c.setFont("Helvetica-Bold", 26)
    c.setFillColor(CREAM)
    c.drawString(x, y, slide["title"])
    y -= 22

    if slide.get("subtitle"):
        c.setFont("Helvetica", 9)
        c.setFillColor(MUTED)
        c.drawString(x, y, slide["subtitle"])
        y -= 20

    items = slide["items"]
    cols = 4
    card_w = (W - 140 - (cols - 1) * 10) / cols
    card_h = 75
    gap_x = 10
    start_y = y - 15
    rows = (len(items) + cols - 1) // cols

    for i, item in enumerate(items):
        col = i % cols
        row = i // cols
        cx = x + col * (card_w + gap_x)
        cy = start_y - row * (card_h + 8) - card_h

        rounded_rect(c, cx, cy, card_w, card_h, r=8, fill_color=NAVY, stroke_color=GOLD, alpha=1)

        # Number
        c.setFont("Helvetica-Bold", 16)
        c.setFillColor(GOLD)
        c.setFillAlpha(0.3)
        c.drawString(cx + 10, cy + card_h - 24, item["num"])
        c.setFillAlpha(1)

        # Name
        c.setFont("Helvetica-Bold", 10)
        c.setFillColor(CREAM)
        c.drawString(cx + 10, cy + 24, item["name"])

        # Detail
        c.setFont("Helvetica", 8)
        c.setFillColor(MUTED)
        c.drawString(cx + 10, cy + 10, item["detail"])


def draw_finalites(c, slide):
    set_bg(c)
    x = 70
    y = H - 60

    section_label(c, slide["section"], x, y)
    y -= 28

    c.setFont("Helvetica-Bold", 26)
    c.setFillColor(CREAM)
    c.drawString(x, y, slide["title"])
    y -= 30

    items = slide["items"]
    cols = 4
    card_w = (W - 140 - (cols - 1) * 12) / cols
    card_h = y - 30
    gap_x = 12

    for i, item in enumerate(items):
        cx = x + i * (card_w + gap_x)
        cy = 30

        rounded_rect(c, cx, cy, card_w, card_h, r=10, fill_color=NAVY, stroke_color=GOLD)

        # Big number
        c.setFont("Helvetica-Bold", 36)
        c.setFillColor(GOLD)
        c.setFillAlpha(0.2)
        c.drawString(cx + 14, cy + card_h - 48, item["num"])
        c.setFillAlpha(1)

        # Title
        c.setFont("Helvetica-Bold", 17)
        c.setFillColor(GOLD_LIGHT)
        c.drawString(cx + 14, cy + card_h - 72, item["title"])

        # Sub
        c.setFont("Helvetica-Oblique", 13)
        c.setFillColor(CREAM)
        c.drawString(cx + 14, cy + card_h - 90, item["sub"])

        # Divider
        divider_line(c, cx + 14, cy + 50, card_w - 28)

        # Result
        c.setFont("Helvetica", 9)
        c.setFillColor(MUTED)
        result_lines = wrap_text(item["result"], 22)
        ry = cy + 38
        for line in result_lines:
            c.drawString(cx + 14, ry, line)
            ry -= 13


def draw_tricolumn(c, slide):
    set_bg(c)
    x = 70
    y = H - 60

    section_label(c, slide["section"], x, y)
    y -= 28

    c.setFont("Helvetica-Bold", 26)
    c.setFillColor(CREAM)
    c.drawString(x, y, slide["title"])
    y -= 22

    if slide.get("subtitle"):
        c.setFont("Helvetica", 10)
        c.setFillColor(MUTED)
        c.drawString(x, y, slide["subtitle"])
        y -= 22

    items = slide["items"]
    cols = 3
    card_w = (W - 140 - (cols - 1) * 16) / cols
    card_h = y - 30
    gap_x = 16

    for i, item in enumerate(items):
        cx = x + i * (card_w + gap_x)
        cy = 30

        rounded_rect(c, cx, cy, card_w, card_h, r=10, fill_color=NAVY, stroke_color=GOLD)

        # Icon label (text, since no emoji font)
        c.setFont("Helvetica-Bold", 11)
        c.setFillColor(GOLD)
        c.drawCentredString(cx + card_w / 2, cy + card_h - 36, f"[ {item['icon']} ]")

        # Title
        c.setFont("Helvetica-Bold", 15)
        c.setFillColor(CREAM)
        c.drawCentredString(cx + card_w / 2, cy + card_h - 58, item["title"])

        # Bullets
        by = cy + card_h - 82
        for b in item["bullets"]:
            lines = wrap_text(b, 28)
            for line in lines:
                c.setFont("Helvetica", 9)
                c.setFillColor(LIGHT_TXT)
                c.drawCentredString(cx + card_w / 2, by, line)
                by -= 13
            by -= 6


def draw_timeline(c, slide):
    set_bg(c)
    x = 70
    y = H - 60

    section_label(c, slide["section"], x, y)
    y -= 28

    c.setFont("Helvetica-Bold", 26)
    c.setFillColor(CREAM)
    c.drawString(x, y, slide["title"])
    y -= 30

    items = slide["items"]
    cols = len(items)
    arrow_w = 18
    total_arrows = (cols - 1) * arrow_w
    card_w = (W - 140 - total_arrows) / cols
    card_h = y - 30

    for i, item in enumerate(items):
        cx = x + i * (card_w + arrow_w)
        cy = 30

        rounded_rect(c, cx, cy, card_w, card_h, r=10, fill_color=NAVY, stroke_color=GOLD)

        # Circle with step number
        c.setFillColor(HexColor("#1e3a5f"))
        c.circle(cx + 26, cy + card_h - 26, 18, fill=1, stroke=0)
        c.setStrokeColor(GOLD)
        c.setLineWidth(1)
        c.circle(cx + 26, cy + card_h - 26, 18, fill=0, stroke=1)
        c.setFont("Helvetica-Bold", 13)
        c.setFillColor(GOLD)
        c.drawCentredString(cx + 26, cy + card_h - 31, item["step"])

        # Step title
        c.setFont("Helvetica-Bold", 11)
        c.setFillColor(CREAM)
        title_lines = wrap_text(item["title"], 22)
        ty = cy + card_h - 58
        for tl in title_lines:
            c.drawString(cx + 12, ty, tl)
            ty -= 14

        # Description
        c.setFont("Helvetica", 9)
        c.setFillColor(MUTED)
        desc_lines = wrap_text(item["desc"], 26)
        dy = ty - 6
        for dl in desc_lines:
            c.drawString(cx + 12, dy, dl)
            dy -= 12

        # Arrow between steps
        if i < cols - 1:
            ax = cx + card_w + 4
            ay = cy + card_h / 2
            c.setFillColor(GOLD)
            c.setFillAlpha(0.4)
            c.setFont("Helvetica-Bold", 16)
            c.drawString(ax, ay - 6, ">")
            c.setFillAlpha(1)


def draw_team(c, slide):
    set_bg(c)
    x = 70
    y = H - 60

    section_label(c, slide["section"], x, y)
    y -= 28

    c.setFont("Helvetica-Bold", 26)
    c.setFillColor(CREAM)
    c.drawString(x, y, slide["title"])
    y -= 22

    c.setFont("Helvetica", 10)
    c.setFillColor(GOLD)
    c.drawString(x, y, slide["subtitle"])
    y -= 28

    items = slide["items"]
    cols = 4
    card_w = (W - 140 - (cols - 1) * 12) / cols
    card_h = y - 30
    gap_x = 12

    for i, item in enumerate(items):
        cx = x + i * (card_w + gap_x)
        cy = 30

        rounded_rect(c, cx, cy, card_w, card_h, r=10, fill_color=NAVY, stroke_color=GOLD)

        # Avatar circle
        av_cx = cx + card_w / 2
        av_cy = cy + card_h - 54
        c.setFillColor(HexColor("#1e3a5f"))
        c.circle(av_cx, av_cy, 36, fill=1, stroke=0)
        c.setStrokeColor(GOLD)
        c.setStrokeAlpha(0.35)
        c.setLineWidth(1.5)
        c.circle(av_cx, av_cy, 36, fill=0, stroke=1)
        c.setStrokeAlpha(1)

        # Initials
        c.setFont("Helvetica-Bold", 18)
        c.setFillColor(GOLD_LIGHT)
        c.drawCentredString(av_cx, av_cy - 7, item["initials"])

        # Name
        c.setFont("Helvetica-Bold", 12)
        c.setFillColor(CREAM)
        c.drawCentredString(av_cx, cy + card_h - 104, item["name"])

        # Role
        c.setFont("Helvetica", 9)
        c.setFillColor(MUTED)
        role_lines = wrap_text(item["role"], 22)
        ry = cy + card_h - 120
        for rl in role_lines:
            c.drawCentredString(av_cx, ry, rl)
            ry -= 12


def draw_closing(c, slide):
    gradient_bg(c)

    # Glow
    c.setFillColor(GOLD)
    c.setFillAlpha(0.07)
    c.circle(W - 80, 80, 200, fill=1, stroke=0)
    c.setFillAlpha(1)

    cx = W / 2
    y = H - 60

    section_label(c, slide["section"], cx - 60, y)
    y -= 34

    # Big title
    c.setFont("Helvetica-Bold", 52)
    c.setFillColor(GOLD_LIGHT)
    c.drawCentredString(cx, y, slide["title"])
    y -= 44

    # Quote
    c.setFont("Helvetica-Oblique", 14)
    c.setFillColor(CREAM)
    c.drawCentredString(cx, y, f"« {slide['quote']} »")
    y -= 18

    c.setFont("Helvetica", 10)
    c.setFillColor(MUTED)
    c.drawCentredString(cx, y, f"— {slide['author']}")
    y -= 28

    # Items
    bx = cx - 300
    for item in slide["items"]:
        gold_dot(c, bx + 5, y + 4)
        lines = wrap_text(item, 72)
        for line in lines:
            c.setFont("Helvetica", 11)
            c.setFillColor(LIGHT_TXT)
            c.drawString(bx + 18, y, line)
            y -= 16
        y -= 6


# ── Renderer map ───────────────────────────────────────────────────────────
RENDERERS = {
    "cover":      draw_cover,
    "bullets":    draw_bullets,
    "grid":       draw_grid,
    "finalites":  draw_finalites,
    "tricolumn":  draw_tricolumn,
    "timeline":   draw_timeline,
    "team":       draw_team,
    "closing":    draw_closing,
}


def draw_chrome(c, idx, total, slide):
    """Draw top and bottom bar."""
    # Top bar
    c.setFillColor(NIGHT)
    c.rect(0, H - 28, W, 28, fill=1, stroke=0)
    c.setStrokeColor(GOLD)
    c.setStrokeAlpha(0.12)
    c.setLineWidth(0.5)
    c.line(0, H - 28, W, H - 28)
    c.setStrokeAlpha(1)

    c.setFont("Helvetica-Bold", 9)
    c.setFillColor(GOLD_LIGHT)
    c.drawString(16, H - 19, "Faire un Pont®")

    c.setFont("Helvetica", 8)
    c.setFillColor(MUTED)
    c.drawRightString(W - 16, H - 19, f"{idx + 1} / {total}")

    # Bottom bar
    c.setFillColor(NIGHT)
    c.rect(0, 0, W, 24, fill=1, stroke=0)
    c.setStrokeColor(GOLD)
    c.setStrokeAlpha(0.12)
    c.setLineWidth(0.5)
    c.line(0, 24, W, 24)
    c.setStrokeAlpha(1)

    # Dots
    dot_total = total
    dot_x = 16
    for i in range(dot_total):
        if i == idx:
            c.setFillColor(GOLD)
            c.rect(dot_x, 8, 18, 6, fill=1, stroke=0)
            dot_x += 22
        else:
            c.setFillColor(MUTED)
            c.setFillAlpha(0.35)
            c.circle(dot_x + 3, 11, 3, fill=1, stroke=0)
            c.setFillAlpha(1)
            dot_x += 12

    # Section
    if slide.get("section"):
        c.setFont("Helvetica", 7)
        c.setFillColor(MUTED)
        c.drawCentredString(W / 2, 9, slide["section"].upper())


def main():
    out_path = "/Users/raphaellevi/Documents/GitHub/faire-un-pont/presentation_faire_un_pont.pdf"
    c = canvas.Canvas(out_path, pagesize=(W, H))
    c.setTitle("Faire un Pont® — Présentation")
    c.setAuthor("Faire un Pont®")
    c.setSubject("Coaching de dirigeants")

    total = len(slides)
    for idx, slide in enumerate(slides):
        renderer = RENDERERS.get(slide["type"])
        if renderer:
            renderer(c, slide)
        draw_chrome(c, idx, total, slide)
        c.showPage()

    c.save()
    print(f"PDF generated: {out_path}")


if __name__ == "__main__":
    main()
